import { HealthController } from "./health.controller";
import Router from "@koa/router";

const getHealthRouter = (healthController: HealthController) =>
  new Router({ prefix: HEALTH_PATH })
    .get("/", (ctx) => (ctx.body = healthController.checkHealth()));


export const HEALTH_PATH = "/health";
export const healthRouter = getHealthRouter(new HealthController());