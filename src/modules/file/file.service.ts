import { Readable } from "stream";
import { logger } from "../../utils/logger";
import { UserId } from "../../utils/schemas/user.id";
import { internalLocalStorage } from "../../config/internal.local.storage.config";
import { Next, ParameterizedContext } from "koa";
import busboy from "busboy";
import {
  FailedUploads,
  FileDownloadResult,
  FileId,
  FileInfo,
  FileKey,
  FileRequest,
  FileUploadResult
} from "./file.interfaces";
import { variablesConfig } from "../../config/variables.config";
import { FilesUploadFailed, ResourceNotFoundError } from "../../errors/error.module";
import { IdUtils } from "../../utils/id.utils";
import { DateUtils } from "../../utils/date.utils";
import { FileRepository } from "./file.repository";
import { Product, ProductId } from "../product/product.interfaces";
import { ProductRepository } from "../product/product.repository";
import { Resource } from "../../utils/constants/resources.names";


export class FileService {
  constructor(
    private storeFile: (stream: Readable, fileKey: FileKey) => Promise<void>,
    private downloadFile: (fileKey: FileKey) => Promise<Readable>
  ) {
  }

  handleProductImageUpload = async (uploadedFiles: string[], failedUploads: FailedUploads): Promise<void> => {
    const userId: UserId = internalLocalStorage.getUserId();

    if (uploadedFiles.length > 0) {
      logger.debug(`Lab results upload confirmed for patient: ${userId}.`);
    }

    logger.info(`Upload finished for user: ${userId}.
    Failed uploads: ${JSON.stringify(failedUploads)}.
    Succeeded uploads: ${JSON.stringify(uploadedFiles)}.`
    );

    if (Object.values(failedUploads).length !== 0)
      throw new FilesUploadFailed({ failedUploads, succeededUploads: uploadedFiles });
  };

  handleFileDownload = async (fileId: FileId): Promise<FileDownloadResult> => {
    const file: FileInfo | null = await FileRepository.findOneById(fileId);

    if (!file)
      throw new ResourceNotFoundError(Resource.FILE);

    logger.debug(`File download started: ${file.id} for user: ${internalLocalStorage.getUserId()} with request ${internalLocalStorage.getRequestId()}.`);
    return { content: await this.downloadFile(file.key), mimeType: file.mimeType };
  };

  handleSingleProductImageUpload = async (stream: Readable, userId: UserId, fileRequest: FileRequest, productId: ProductId): Promise<FileUploadResult> => {
    const fileKey: FileKey = IdUtils.provideFileKey(userId, fileRequest.mimeType, fileRequest.filename);
    const product: Product | null = await ProductRepository.findOne(productId);

    if (!product)
      throw new ResourceNotFoundError(Resource.PRODUCT); //TODO fix async error throwing in koa while streaming

    const file: FileInfo = {
      id: IdUtils.provideFileId(),
      ownerId: userId,
      createdAt: DateUtils.getDateNow(),
      key: fileKey,
      resourceId: productId,
      ...fileRequest
    };

    await this.storeFile(stream, fileKey);
    logger.debug(`File uploaded: ${file.id} for user: ${userId} with request ${internalLocalStorage.getRequestId()}.`);
    await FileRepository.createFileInfo(file);
    logger.silly(`File info created: ${file.id} for user: ${userId} with request ${internalLocalStorage.getRequestId()}.`);

    return { fileId: file.id, fileKey: file.key };
  };

  streamFile = (fileUploadedHandler: (uploadedFiles: string[], failedUploads: FailedUploads) => Promise<void>,
                singleFileUploadHandler: (stream: Readable, userId: UserId, fileRequest: FileRequest, resourceId: string) => Promise<FileUploadResult>) =>
    async (ctx: ParameterizedContext, next: Next): Promise<void> => {
      try {
        let receivedFilesNumber = 0;
        const userId: UserId = internalLocalStorage.getUserId();
        const uploadedFiles: string[] = [];
        const failedUploads: FailedUploads = {};
        const bb = busboy({ headers: ctx.request.headers });

        bb.on("file", (_: string, stream: Readable, info: FileRequest) => {
          info.mimeType = this.mapMimeTypeOrThrowError(info.mimeType);
          receivedFilesNumber++;

          if (receivedFilesNumber > variablesConfig.maxFilesUploadNumber) {
            failedUploads[info.filename] = variablesConfig.maxFilesNumberExceededMessage;
            return stream.resume();
          }

          singleFileUploadHandler(stream, userId, info, ctx.params.resourceId)
            .then(() => {
              uploadedFiles.push(info.filename);
              stream.resume();
            })
            .catch(err => {
              logger.error(err);
              failedUploads[info.filename] = variablesConfig.serverCannotHandleFileUploadMessage;
              stream.resume();
            });
        });

        bb.on("close", async () => {
          await fileUploadedHandler(uploadedFiles, failedUploads);
          return next();
        });

        ctx.req.pipe(bb);
      } catch (err) {
        logger.error(`File upload failed: ${err}`);
        throw new FilesUploadFailed(err.message);
      }
    };

  private mapMimeTypeOrThrowError = (mimeType: string): string => {
    const mappedMimeType: string | undefined = mimeType.split(variablesConfig.mimeTypeSplitter).pop();

    if (!mappedMimeType)
      throw new ResourceNotFoundError(Resource.MIME_TYPE);

    return mappedMimeType;
  };
}