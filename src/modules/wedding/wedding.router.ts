import Router from "@koa/router";
import { WeddingRequestBody } from "./schemas/wedding.request.body";
import { PartyEventService } from "../party.event/party.event.service";
import { PartyEventRepository } from "../party.event/party.event.repository";
import { createWedding } from "./wedding.service";

export const WEDDING_PATH = "/wedding";

const createWeddingHandler =
  (weddingRequestBody: WeddingRequestBody) => createWedding(new PartyEventService(new PartyEventRepository()).createPartyEvent)(weddingRequestBody);

export const weddingRouter = new Router({ prefix: WEDDING_PATH })
  .post("/", (ctx) => (ctx.body = createWeddingHandler(ctx.request.body as WeddingRequestBody)));