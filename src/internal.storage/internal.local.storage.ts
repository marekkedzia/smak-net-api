import {AsyncLocalStorage} from "async_hooks";
import {UserId} from "../utils/schemas/user.id";
import {logger} from "../utils/logger";
import {InternalServerError} from "../errors/error.module";
import {Context, Next} from "koa";
import {RequestId} from "../utils/schemas/request.id";
import {IdUtils} from "../utils/id.utils";

export class InternalLocalStorage {
    localStorage: AsyncLocalStorage<Map<string, string>> = new AsyncLocalStorage<Map<string, any>>();

    startStorage = async (ctx: Context, next: Next): Promise<void> => {
        await this.localStorage.run(new Map(), async () => await next());
        this.storeRequestId(ctx, next);
        this.storeUserId(ctx, next);
    };

    storeRequestId = async (ctx: Context, next: Next): Promise<void> => {
        this.getStore().set("requestId", IdUtils.provideRequestId());
        await next();
    };

    storeUserId = async (ctx: Context, next: Next): Promise<void> => {
        this.setUserId("DUMMY_USER_ID" as UserId); //TODO
        await next();
    };

    setRequestId = (requestId: RequestId): void => {
        this.getStore().set("requestId", requestId);
    };
    setUserId = (userId: UserId): void => {
        this.getStore().set("userId", userId);
    };

    getRequestId = (): RequestId => this.getStore().get("requestId");

    getUserId = (): UserId => this.getStore().get("userId");

    private getStore = (): Map<string, any> => {
        const store = this.localStorage.getStore();

        if (!store) {
            logger.error("Storage wasn't found. Action cannot be completed.");
            throw new InternalServerError();
        }

        return store;
    };
}
