import { v4 as uuid } from "uuid";
import { ErrorId } from "../errors/error.id";
import { InternalEventId } from "../internal.event/internal.event.id";
import { RequestId } from "./schemas/request.id";
import crypto from "crypto";

export class IdUtils {
  private static provideId = uuid;
  public static provideErrorId = (): ErrorId => `${IdPrefix.ERROR}-${this.provideId()}` as ErrorId;
  public static provideInternalEventId = (): InternalEventId => `${IdPrefix.INTERNAL_EVENT}-${this.provideId()}` as InternalEventId;
  public static provideRequestId = (): RequestId => `${IdPrefix.REQUEST_ID}-${this.provideId()}` as RequestId;
}

enum IdPrefix {
  ERROR = "err",
  INTERNAL_EVENT = "ie",
  REQUEST_ID = "req",
}