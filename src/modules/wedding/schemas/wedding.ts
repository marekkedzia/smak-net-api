import {
  PartyEvent,
  PartyEventAccessKey,
  PartyEventCredentials,
  PartyEventId,
  PartyEventName
} from "../../party.event/schemas/party.event";
import { PartyEventState } from "../../party.event/schemas/party.event.states";
import { ServerDateType } from "../../../services/date.service";

export type Wedding = PartyEvent;
export type WeddingId = PartyEventId;
export type WeddingName = PartyEventName;
export type WeddingState = PartyEventState;
export type WeddingCredentials = PartyEventCredentials;
export type WeddingListElement = { id: WeddingId, createdAt: Date, state: WeddingState };
export type GuestWeddingCredentials = {
  id: WeddingId,
  createdAt: ServerDateType,
  state: WeddingState,
  credentials: WeddingCredentials,
}
export type WeddingAccessKey = PartyEventAccessKey;