import { WeddingRequestBody } from "./schemas/wedding.request.body";
import { InternalRouter } from "../../utils/schemas/router";
import { Body, Get, OperationId, Post, Put, Route, Security } from "tsoa";
import { WeddingService } from "./wedding.service";
import { Wedding, WeddingAccessKey, WeddingId, WeddingListElement } from "./schemas/wedding";
import { Context } from "koa";
import { PartyEvent } from "../party.event/schemas/party.event";

@Route("/wedding")
export class WeddingRouter extends InternalRouter {
  constructor(private weddingService: WeddingService) {
    super("/wedding");

    this.router
      .get("/", async (ctx: Context): Promise<WeddingListElement[]> =>
        (ctx.body = await this.readUsersWeddingListHandler()))
      .get("/:weddingId", async (ctx: Context): Promise<PartyEvent> =>
        (ctx.body = await this.readWeddingHandler(ctx.params.weddingId)))

      .post("/", async (ctx: Context): Promise<string> =>
        (ctx.body = await this.createWeddingHandler(ctx.request.body as WeddingRequestBody)))
      .post("/:weddingId/access-key", async (ctx: Context): Promise<WeddingAccessKey> =>
        (ctx.body = await this.generateWeddingAccessKeyHandler(ctx.params.weddingId)))

      .put("/:weddingId/closed-state", async (ctx: Context): Promise<void> =>
        (ctx.body = await this.closeWeddingHandler(ctx.params.weddingId)));
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
  readWeddingHandler(weddingId: string): Promise<Wedding> {
    return this.weddingService.readWeddingDetails(weddingId as WeddingId);
  }

  /**
   * Get wedding list.
   */
  @OperationId("getWeddingList")
  @Security("jwt", ["user:read"])
  @Get("/")
  readUsersWeddingListHandler(): Promise<WeddingListElement[]> {
    return this.weddingService.readUsersWeddingsList();
  }

  /**
   * Close wedding.
   */
  @OperationId("closeWedding")
  @Security("jwt", ["user:update"])
  @Put("/:weddingId/closed-state")
  closeWeddingHandler(weddingId: string): Promise<void> {
    return this.weddingService.closeWedding(weddingId as WeddingId);
  }

  /**
   * Generate wedding access key.
   */
  @OperationId("generateWeddingAccessKey")
  @Security("jwt", ["user:create"])
  @Post("/:weddingId/access-key")
  generateWeddingAccessKeyHandler(weddingId: string): Promise<WeddingAccessKey> {
    return this.weddingService.generateWeddingAccessKey(weddingId as WeddingId);
  }
}