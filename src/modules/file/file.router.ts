import { InternalRouter } from "../../utils/schemas/router";
import { Route } from "tsoa";
import { FileService } from "./file.service";
import { paths } from "../../config/variables.config";
import { HTTP_STATUS } from "../../utils/constants/http.statuses";


@Route("/file")
export class FileRouter extends InternalRouter {
  constructor(private fileService: FileService) {
    super(paths.file);

    this.router.post(`${paths.product}/:productId/image`,
      (ctx, next) =>
        fileService.streamFile(ctx, next).then(async () => {
            ctx.status = HTTP_STATUS.CREATED
          }
        ),
    );
  }
}