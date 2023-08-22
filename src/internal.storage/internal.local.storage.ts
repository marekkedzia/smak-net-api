import { AsyncLocalStorage } from "async_hooks";
import { ISODateRange } from "../services/date.service";
import { UserId } from "../utils/schemas/user.id";
import { logger } from "../utils/logger";
import { InternalServerError } from "../errors/error.module";

export class InternalLocalStorage {
  localStorage = new AsyncLocalStorage<Map<string, any>>();

  startStorage = (req, res, next): void => {
    this.localStorage.run(new Map(), next);
  };

  storeUserId = (userId: UserId): void => {
    this.getStore().set("userId", userId);
  };

  storeDateRange = (dateRange: ISODateRange): void => {
    this.getStore().set("dateRange", dateRange);
  };

  getUserId = (): UserId => this.getStore().get("userId");

  getDateRange = (): ISODateRange => this.getStore().get("dateRange");

  private getStore = (): Map<string, any> => {
    const store = this.localStorage.getStore();

    if (!store) {
      logger.error("Storage wasn't found. Action cannot be completed.");
      throw new InternalServerError();
    }

    return store;
  };
}
