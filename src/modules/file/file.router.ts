import { InternalRouter } from "../../utils/schemas/router";
import { Route } from "tsoa";
import { FileService } from "./file.service";
import { paths } from "../../config/variables.config";
import { FailedUploads } from "./file.interfaces";
import { HTTP_STATUS } from "../../utils/constants/http.statuses";


@Route("/file")
export class FileRouter extends InternalRouter {
  constructor(private fileService: FileService) {
    super(paths.file);

    this.router.post(`${paths.product}/:productId/image`,
      (ctx, next) => fileService.streamDocument(ctx, next),
      async (ctx) => {
        ctx.body = await this.addProductImage(ctx.uploadedFiles, ctx.failedUploads);
        ctx.status = HTTP_STATUS.CREATED;
      });

  }

  /**
   * Upload product's image.
   */
  @Route("/product/{productId}/image")
  addProductImage(uploadedFiles: string[], failedUploads: FailedUploads): Promise<void> {
    return this.fileService.confirmFileUpload(uploadedFiles, failedUploads);
  }
}