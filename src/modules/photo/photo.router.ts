import { InternalRouter } from "../../utils/schemas/router";
import { OperationId, Put, Security } from "tsoa";
import { PhotoService } from "./photo.service";
import { FileCredentials } from "../party.event/party.event.file.service/schema/file.info";
import { Context } from "koa";
import { validate } from "../../utils/validator";
import { putPhotoValidator } from "./validators/put.photo.validator";

export class PhotoRouter extends InternalRouter {
  constructor(private photoService: PhotoService) {
    super("/photo");

    this.router.put("/", validate(putPhotoValidator), async (ctx: Context): Promise<string> =>
      (ctx.body = await this.obtainPutPhotoUrl(ctx.request.body as FileCredentials)));
  }

  /**
   * Obtain put photo url
   **/
  @OperationId("obtainPutPhotoUrl")
  @Security("jwt", ["user:write"])
  @Put("/")
  obtainPutPhotoUrl(photoCredentials: FileCredentials): Promise<string> {
    return this.photoService.obtainPutPhotoUrl(photoCredentials);
  }
}