import Koa from "koa";
import cors from "@koa/cors";
import { bodyParser } from "@koa/bodyparser";
import { weddingRouter } from "./context/owner.wedding.context";
import { healthRouter } from "./context/health.context";
import { internalLocalStorage } from "./config/internal.local.storage.config";
import { errorHandler } from "./errors/error.handler";
import { photoRouter } from "./context/photo.context";

export const app = new Koa()
  .use(errorHandler)
  .use(cors())
  .use(bodyParser())
  .use(internalLocalStorage.startStorage)
  .use(internalLocalStorage.storeRequestId)
  .use(internalLocalStorage.storeUserId)
  .use(healthRouter.getRoutes())
  .use(weddingRouter.getRoutes())
  .use(photoRouter.getRoutes());