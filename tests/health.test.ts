import { HEALTH_PATH } from "../src/modules/health/health.router";
import { app } from "../src/app";
import supertest from "supertest";
import { HEALTH_MESSAGE } from "../src/modules/health/health.service";
import { HTTP_STATUS } from "../src/utils/constants/http.statuses";

describe(`GET ${HEALTH_PATH}`, () => {
  const server = app.listen();

  afterAll(async () => {
    await server.close();
  });

  it("should get standard health message", async () => {
    const { status, body } = await supertest(server)
      .get(HEALTH_PATH)
      .send();

    expect(status).toBe(HTTP_STATUS.OK);
    expect(body).toStrictEqual(HEALTH_MESSAGE);
  });
});