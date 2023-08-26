import Koa from "koa";
import { InternalRouter } from "../../src/utils/schemas/router";
import { bodyParser } from "@koa/bodyparser";
import { internalLocalStorage } from "../../src/config/internal.local.storage.config";
import { Response } from "../utils/response";
import supertest from "supertest";
import { errorHandler } from "../../src/errors/error.handler";

export const generateTestApp = (router: InternalRouter) =>
  new Koa()
    .use(errorHandler)
    .use(bodyParser())
    .use(internalLocalStorage.startStorage)
    .use(internalLocalStorage.storeRequestId)
    .use(internalLocalStorage.storeUserId)
    .use(router.getRoutes());


export const obtainTestGetResponse = async (router: InternalRouter, path: string): Promise<Response> => { //TODO move to another file
  const app = generateTestApp(router).listen();

  const { status, body } = await supertest(app)
    .get(path)
    .send();

  app.close();

  return { status, body };
};