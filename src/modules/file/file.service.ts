import { Readable } from "stream";
import { logger } from "../../utils/logger";
import { UserId } from "../../utils/schemas/user.id";
import { internalLocalStorage } from "../../config/internal.local.storage.config";
import { Next, ParameterizedContext } from "koa";
import busboy from "busboy";
import { FailedUploads, FileRequest, FileKey, FileInfo, FileId } from "./file.interfaces";
import { variablesConfig } from "../../config/variables.config";
import { FilesUploadFailed } from "../../errors/error.module";
import { IdUtils } from "../../utils/id.utils";
import { DateUtils } from "../../utils/date.utils";
import { FileRepository } from "./file.repository";
import { ProductId } from "../product/product.interfaces";


export class FileService {
  constructor(private storeFile: (stream: Readable, fileKey: FileKey) => Promise<void>) {
  }

  confirmFileUpload = async (uploadedFiles: string[], failedUploads: FailedUploads): Promise<void> => {
    const userId: UserId = internalLocalStorage.getUserId();

    if (uploadedFiles.length > 0) {
      logger.debug(`Lab results upload confirmed for patient: ${userId}.`);
    }

    logger.info(`Lab results upload finished for patient: ${userId}.
    Failed uploads: ${JSON.stringify(failedUploads)}.
    Succeeded uploads: ${JSON.stringify(uploadedFiles)}.`
    );

    if (Object.values(failedUploads).length !== 0)
      throw new FilesUploadFailed({ failedUploads, succeededUploads: uploadedFiles });
  };

  private handleDocumentUpload = async (stream: Readable, userId: UserId, fileRequest: FileRequest, productId: ProductId): Promise<{ fileId: FileId, fileKey: FileKey }> => {
    const fileKey: FileKey = IdUtils.provideFileKey(userId, fileRequest.mimeType, fileRequest.name);

    const file: FileInfo = {
      id: IdUtils.provideFileId(),
      ownerId: userId,
      createdAt: DateUtils.getDateNow(),
      key: fileKey,
      productId,
      ...fileRequest
    };

    await this.storeFile(stream, fileKey);
    logger.debug(`File uploaded: ${file.id} for user: ${userId} with request ${internalLocalStorage.getRequestId()}.`);
    await FileRepository.createFileInfo(file);
    logger.silly(`File info created: ${file.id} for user: ${userId} with request ${internalLocalStorage.getRequestId()}.`);

    return { fileId: file.id, fileKey: file.key };
  };

  streamDocument = (ctx: ParameterizedContext, next: Next): void => {
    try {
      let receivedFilesNumber = 0;
      const userId: UserId = internalLocalStorage.getUserId();
      const uploadedFiles: string[] = [];
      const failedUploads: FailedUploads = {};
      const bb = busboy({ headers: ctx.request.headers });

      bb.on("file", (name: string, stream: Readable, info: FileRequest) => {
        receivedFilesNumber++;

        if (receivedFilesNumber > variablesConfig.maxFilesUploadNumber) {
          failedUploads[name] = variablesConfig.maxFilesNumberExceededMessage;
          return stream.resume();
        }

        this.handleDocumentUpload(stream, userId, info, ctx.params.productId)
          .then(() => {
            uploadedFiles.push(name);
            stream.resume();
          })
          .catch(err => {
            logger.error(err);
            failedUploads[name] = variablesConfig.serverCannotHandleFileUploadMessage;
            stream.resume();
          });
      });

      bb.on("close", async () => {
        ctx.failedUploads = failedUploads;
        ctx.uploadedFiles = uploadedFiles;

        return next();
      });

      ctx.req.pipe(bb);
    } catch (err) {
      logger.error(`File upload failed: ${err}`);
      throw new FilesUploadFailed(err.message);
    }
  };
}