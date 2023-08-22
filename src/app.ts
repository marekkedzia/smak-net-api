import Koa from "koa";
import cors from "@koa/cors";
import { healthRouter } from "./modules/health/health.router";

export const app = new Koa()
  .use(cors())
  .use(healthRouter.routes())