export class HealthService {
  healthMessage = { status: "Server is running" };
  checkHealth = () => this.healthMessage;
}