import Koa from "koa";
import cors from "@koa/cors";
import { bodyParser } from "@koa/bodyparser";
import { healthRouter } from "./context/health.context";
import { internalLocalStorage } from "./config/internal.local.storage.config";
import { errorHandler } from "./errors/error.handler";
import { productRouter } from "./context/product.context";
import { fileRouter } from "./context/file.context";
import { cartRouter } from "./context/cart.context";
import { paymentRouter } from "./context/payment.context";
import { orderRouter } from "./context/order.context";
import { webhookRouter } from './context/webhook.context';


export const app = new Koa()
  .use(errorHandler)
  .use(cors())
  .use(webhookRouter.getRoutes())
  .use(bodyParser())
  .use(healthRouter.getRoutes())
  .use(internalLocalStorage.startStorage)
  .use(productRouter.getRoutes())
  .use(fileRouter.getRoutes())
  .use(cartRouter.getRoutes())
  .use(paymentRouter.getRoutes())
  .use(orderRouter.getRoutes());