import Koa from "koa";
import cors from "@koa/cors";
import { bodyParser } from "@koa/bodyparser";
import { healthRouter } from "./context/health.context";
import { internalLocalStorage } from "./config/internal.local.storage.config";
import { errorHandler } from "./errors/error.handler";
import { productRouter } from "./context/product.context";
import { fileRouter } from "./context/file.context";


export const app = new Koa()
  .use(errorHandler)
  .use(cors())
  .use(bodyParser())
  .use(healthRouter.getRoutes())
  .use(internalLocalStorage.startStorage)
  .use(productRouter.getRoutes())
  .use(fileRouter.getRoutes());