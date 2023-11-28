import { AsyncLocalStorage } from "async_hooks";
import { UserId } from "../utils/schemas/user.id";
import { logger } from "../utils/logger";
import { InternalServerError } from "../errors/error.module";
import { Context, Next } from "koa";
import { RequestId } from "../utils/schemas/request.id";
import { IdUtils } from "../utils/id.utils";

export class InternalLocalStorage {
  localStorage: AsyncLocalStorage<{ [key: string]: string }> = new AsyncLocalStorage<{ [key: string]: string }>();

  constructor() {
    this.localStorage = new AsyncLocalStorage<{ [key: string]: string }>();
  }

  startStorage = async (ctx: Context, next: Next): Promise<void> => {
      await this.localStorage.run({
        "requestId": IdUtils.provideRequestId().toString(),
        "userId": "DUMMY_USER_ID"
      }, next);
  };

  getRequestId = (): RequestId => this.getStore()["requestId"] as RequestId;

  getUserId = (): UserId => this.getStore()["userId"] as UserId;

  private getStore = (): { [key: string]: string } => {
    const store = this.localStorage.getStore();

    if (!store) {
      logger.error("Storage wasn't found. Action cannot be completed.");
      throw new InternalServerError();
    }

    return store;
  };

}