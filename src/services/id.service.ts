import { v4 as uuid } from "uuid";
import { PartyEventId } from "../modules/party.event/schemas/party.event";
import { ErrorId } from "../errors/error.id";
import { InternalEventId } from "../internal.event/internal.event.id";

export class IdService {
  private static provideId = uuid;

  public static provideEventId = (): PartyEventId => `${IdPrefix.PARTY_EVENT}-${this.provideId()}` as PartyEventId;
  public static provideErrorId = (): ErrorId => `${IdPrefix.ERROR}-${this.provideId()}` as ErrorId;
  public static provideInternalEventId = (): InternalEventId => `${IdPrefix.INTERNAL_EVENT}-${this.provideId()}` as InternalEventId;
}

enum IdPrefix {
  PARTY_EVENT = "p_e",
  ERROR = "err",
  INTERNAL_EVENT = "i_e"
}