import Koa, { Context, Next } from "koa";
import cors from "@koa/cors";
import { bodyParser } from "@koa/bodyparser";
import { weddingRouter } from "./context/wedding.context";
import { healthRouter } from "./context/health.context";
import { internalLocalStorage } from "./config/internal.local.storage.config";

export const app = new Koa()
  .use(cors())
  .use(bodyParser())
  .use(internalLocalStorage.startStorage)
  .use(internalLocalStorage.storeRequestId)
  .use(internalLocalStorage.storeUserId)
  .use(healthRouter.getRoutes())
  .use(weddingRouter.getRoutes());