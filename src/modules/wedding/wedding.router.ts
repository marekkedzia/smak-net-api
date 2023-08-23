import { WeddingRequestBody } from "./schemas/wedding.request.body";
import { InternalRouter } from "../../utils/schemas/router";
import { Body, OperationId, Post, Route, Security } from "tsoa";
import { createWedding } from "./wedding.service";
import { WeddingRouterPort } from "./schemas/wedding.router.port";

@Route("/wedding")
export class WeddingRouter extends InternalRouter {
  constructor(private weddingRouterAdapter: WeddingRouterPort) {
    super("/wedding");

    this.router
      .post("/", (ctx) => (ctx.body = this.createWeddingHandler(ctx.request.body as WeddingRequestBody)));
  }

  /**
   * Create wedding for user.
   */
  @OperationId("createWedding")
  @Security("jwt", ["user:write"])
  @Post("/")
  createWeddingHandler(@Body() weddingRequestBody: WeddingRequestBody): Promise<string> {
    return createWedding(this.weddingRouterAdapter.createWeddingEvent)(weddingRequestBody);
  }
}