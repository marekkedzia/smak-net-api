import { HealthRouter } from "../modules/health/health.router";
import { HealthService } from "../modules/health/health.service";

export const healthRouter = new HealthRouter(new HealthService());