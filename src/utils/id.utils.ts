import { v4 as uuid } from "uuid";
import { PartyEventAccessKey, PartyEventId } from "../modules/party.event/schemas/party.event";
import { ErrorId } from "../errors/error.id";
import { InternalEventId } from "../internal.event/internal.event.id";
import { RequestId } from "./schemas/request.id";
import crypto from "crypto";
import { FileId } from "../apis/aws.api";

export class IdUtils {
  private static provideId = uuid;
  private static provideAccessKey = (defaultAccessKeyLength = 64) =>
    crypto.randomBytes(defaultAccessKeyLength).toString("hex");
  public static provideEventId = (): PartyEventId => `${IdPrefix.PARTY_EVENT}-${this.provideId()}` as PartyEventId;
  public static provideErrorId = (): ErrorId => `${IdPrefix.ERROR}-${this.provideId()}` as ErrorId;
  public static provideInternalEventId = (): InternalEventId => `${IdPrefix.INTERNAL_EVENT}-${this.provideId()}` as InternalEventId;
  public static providePartyEventAccessKey = (): PartyEventAccessKey => `${IdPrefix.PARTY_EVENT_ACCESS_KEY}-${this.provideAccessKey()}` as PartyEventAccessKey;
  public static provideRequestId = (): RequestId => `${IdPrefix.REQUEST_ID}-${this.provideId()}` as RequestId;
  public static providePhotoId = (): FileId => `${IdPrefix.PHOTO_ID}-${this.provideId()}` as FileId;
}

enum IdPrefix {
  PARTY_EVENT = "pe",
  ERROR = "err",
  INTERNAL_EVENT = "ie",
  PARTY_EVENT_ACCESS_KEY = "ac",
  REQUEST_ID = "req",
  PHOTO_ID = "ph"
}