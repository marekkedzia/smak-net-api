import Koa from "koa";
import cors from "@koa/cors";
import { healthRouter } from "./modules/health/health.router";
import { weddingRouter } from "./modules/wedding/wedding.router";
import { bodyParser } from "@koa/bodyparser";

export const app = new Koa()
  .use(cors())
  .use(bodyParser())
  .use(healthRouter.routes())
  .use(weddingRouter.routes());