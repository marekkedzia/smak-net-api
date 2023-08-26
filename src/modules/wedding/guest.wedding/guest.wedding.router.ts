import { InternalRouter } from "../../../utils/schemas/router";
import { Get, OperationId, Security } from "tsoa";
import { GuestWeddingCredentials, WeddingAccessKey } from "../schemas/wedding";
import { Context } from "koa";
import { GuestWeddingService } from "./guest.wedding.service";

export class GuestWeddingRouter extends InternalRouter {
  constructor(private guestWeddingService: GuestWeddingService) {
    super("/guest/wedding");

    this.router.get("/:weddingAccessKey", async (ctx: Context): Promise<GuestWeddingCredentials> =>
      (ctx.body = await this.getWeddingByAccessKeyHandler(ctx.params.weddingAccessKey)));
  }

  /**
   * Get wedding by access key.
   */
  @OperationId("getWeddingByAccessKey")
  @Security("none")
  @Get("/:weddingAccessKey")
  getWeddingByAccessKeyHandler(weddingAccessKey: string): Promise<GuestWeddingCredentials> {
    return this.guestWeddingService.getWeddingByAccessKey(weddingAccessKey as WeddingAccessKey);
  }
}