import { PartyEvent, PartyEventAccessKey, PartyEventId, PartyEventName } from "../../party.event/schemas/party.event";
import { PartyEventState } from "../../party.event/schemas/party.event.states";

export type Wedding = PartyEvent;
export type WeddingId = PartyEventId;
export type WeddingName = PartyEventName;
export type WeddingState = PartyEventState;
export type WeddingListElement = { id: WeddingId, createdAt: Date, state: WeddingState };
export type WeddingAccessKey = PartyEventAccessKey;