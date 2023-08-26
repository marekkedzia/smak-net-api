import { WeddingRequestBody } from "../schemas/wedding.request.body";
import { InternalRouter } from "../../../utils/schemas/router";
import { Body, Get, OperationId, Post, Put, Route, Security } from "tsoa";
import { OwnerWeddingService } from "./owner.wedding.service";
import { Wedding, WeddingAccessKey, WeddingId, WeddingListElement } from "../schemas/wedding";
import { Context } from "koa";
import { PartyEvent } from "../../party.event/schemas/party.event";

@Route("/wedding")
export class OwnerWeddingRouter extends InternalRouter {
  constructor(private weddingService: OwnerWeddingService) {
    super("/owner/wedding");

    this.router
      .post("/", async (ctx: Context): Promise<string> =>
        (ctx.body = await this.createWeddingHandler(ctx.request.body as WeddingRequestBody)))
      .post("/:weddingId/access-key", async (ctx: Context): Promise<WeddingAccessKey> =>
        (ctx.body = await this.updateWeddingAccessKeyHandler(ctx.params.weddingId)))

      .get("/", async (ctx: Context): Promise<WeddingListElement[]> =>
        (ctx.body = await this.getWeddingListHandler()))
      .get("/:weddingId", async (ctx: Context): Promise<PartyEvent> =>
        (ctx.body = await this.getWeddingHandler(ctx.params.weddingId)))

      .put("/:weddingId/closed-state", async (ctx: Context): Promise<void> =>
        (ctx.body = await this.closeWeddingStateHandler(ctx.params.weddingId)));
  }

  /**
   * Create wedding for user.
   */
  @OperationId("createWedding")
  @Security("jwt", ["user:write"])
  @Post("/")
  createWeddingHandler(@Body() weddingRequestBody: WeddingRequestBody): Promise<string> {
    return this.weddingService.createWedding(weddingRequestBody);
  }

  /**
   * Get wedding by id.
   */
  @OperationId("getWedding")
  @Security("jwt", ["user:read"])
  @Get("/:weddingId")
  getWeddingHandler(weddingId: string): Promise<Wedding> {
    return this.weddingService.getWedding(weddingId as WeddingId);
  }

  /**
   * Get wedding list.
   */
  @OperationId("getWeddingList")
  @Security("jwt", ["user:read"])
  @Get("/")
  getWeddingListHandler(): Promise<WeddingListElement[]> {
    return this.weddingService.getWeddingsList();
  }

  /**
   * Close wedding.
   */
  @OperationId("closeWedding")
  @Security("jwt", ["user:update"])
  @Put("/:weddingId/closed-state")
  closeWeddingStateHandler(weddingId: string): Promise<void> {
    return this.weddingService.closeWedding(weddingId as WeddingId);
  }

  /**
   * Generate wedding access key.
   */
  @OperationId("generateWeddingAccessKey")
  @Security("jwt", ["user:create"])
  @Post("/:weddingId/access-key")
  updateWeddingAccessKeyHandler(weddingId: string): Promise<WeddingAccessKey> {
    return this.weddingService.updateWeddingAccessKey(weddingId as WeddingId);
  }
}