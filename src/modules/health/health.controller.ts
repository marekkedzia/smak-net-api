import { Get, OperationId, Route } from "tsoa";

export const HEALTH_MESSAGE = { status: "Server is running" };

@Route(`/health`)
export class HealthController {

  /**
   * Check server health
   */
  @OperationId("checkHealth")
  @Get("/")
  checkHealth = () => HEALTH_MESSAGE;
}