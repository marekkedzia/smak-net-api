import { InternalRouter } from "../../utils/schemas/router";
import { Get, OperationId, Path, Post, Route, Security } from "tsoa";
import { FileService } from "./file.service";
import { paths } from "../../config/variables.config";
import { HTTP_STATUS } from "../../utils/constants/http.statuses";
import { Next, ParameterizedContext } from "koa";
import { FailedUploads, FileDownloadResult, FileId, } from "./file.interfaces";
import { ProductId } from "../product/product.interfaces";

type ProductImageHandlers = {
  handleProductImageUpload: (uploadedFiles: string[], failedUploads: FailedUploads) => Promise<void>;
  validateImageUploadAccess: (productId: ProductId) => Promise<void>;
}

@Route("/file")
export class FileRouter extends InternalRouter {
  constructor(private fileService: FileService, private productImageHandlers: ProductImageHandlers) {
    super(paths.file);

    this.router.post(`${paths.product}/:productId`,
      (ctx: ParameterizedContext, next) =>
        this.streamProductImage(ctx, next).then(async (): Promise<void> => {
            ctx.status = HTTP_STATUS.CREATED;
          }
        )
    );

    this.router.get(`/:fileId`,
      (ctx: ParameterizedContext) =>
        this.getFile(ctx.params.fileId).then(async ({ content, mimeType }): Promise<void> => {
            ctx.body = content;
            ctx.set("Content-Type", `application/${mimeType}`);
            ctx.status = HTTP_STATUS.OK;
          }
        )
    );
  }

  /**
   * Upload file
   */
  @OperationId("add product file")
  @Security("jwt", ["admin"])
  @Post("/product/:productId")
  streamProductImage(ctx: ParameterizedContext, next: Next): Promise<void> {
    return this.fileService.streamFile(this.productImageHandlers.handleProductImageUpload, this.productImageHandlers.validateImageUploadAccess)(ctx, next);
  }

  /**
   * Download file
   */
  @OperationId("get file")
  @Security("jwt", ["user"])
  @Get("/:fileId")
  getFile(@Path() fileId: string): Promise<FileDownloadResult> {
    return this.fileService.handleFileDownload(fileId as FileId);
  }
}