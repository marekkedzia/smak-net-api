import { checkHealth } from "./health.service";
import { InternalRouter } from "../../utils/schemas/router";
import { Get, OperationId, Route, Security } from "tsoa";

@Route("/health")
export class HealthRouter extends InternalRouter {
  constructor() {
    super("/health");

    this.router.get("/", (ctx) => (ctx.body = this.getHealthHandler()));
  }

  /**
   * Get health status
   */
  @OperationId("getHealth")
  @Security("none")
  @Get("/")
  getHealthHandler() {
    return checkHealth();
  }
}


