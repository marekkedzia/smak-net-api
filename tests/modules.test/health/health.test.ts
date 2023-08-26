import { app } from "../../../src/app";
import supertest from "supertest";
import { HTTP_STATUS } from "../../../src/utils/constants/http.statuses";
import { HealthRouter } from "../../../src/modules/health/health.router";
import { HealthService } from "../../../src/modules/health/health.service";

const healthService = new HealthService();
const healthRouter = new HealthRouter(healthService);

describe(`GET ${healthRouter.path}`, () => {
  const server = app.listen();

  afterAll(async () => {
    await server.close();
  });

  it("should get standard health message", async () => {
    const { status, body } = await supertest(server)
      .get(healthRouter.path)
      .send();

    expect(status).toBe(HTTP_STATUS.OK);
    expect(body).toStrictEqual(healthService.healthMessage);
  });
});