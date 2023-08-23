import Koa from "koa";
import cors from "@koa/cors";
import { bodyParser } from "@koa/bodyparser";
import { weddingRouter } from "./context/wedding.context";
import { healthRouter } from "./context/health.context";

export const app = new Koa()
  .use(cors())
  .use(bodyParser())
  .use(healthRouter.getRoutes())
  .use(weddingRouter.getRoutes());