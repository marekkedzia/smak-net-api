import Router from "@koa/router";
import { checkHealth } from "./health.service";

export const HEALTH_PATH = "/health";

export const healthRouter =
  new Router({ prefix: HEALTH_PATH })
    .get("/", (ctx) => (ctx.body = checkHealth()));


