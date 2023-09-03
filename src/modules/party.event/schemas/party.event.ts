import { Opaque } from "ts-opaque";
import { DatabaseObject } from "../../../utils/schemas/database.object";
import { PartyEventState } from "./party.event.states";
import { ServerDateType } from "../../../utils/date.utils";

export type PartyEventId = Opaque<"id", PartyEvent>
export type PartyEventName = Opaque<"name", PartyEvent>
export type PartyEventAccessKey = Opaque<"accessKey", PartyEvent>

export interface PartyEvent extends DatabaseObject<PartyEventId, PartyEventCredentials> {
  state: PartyEventState;
}

export interface PartyEventCredentials {
  name: PartyEventName;
  date: ServerDateType;
  accessKey?: PartyEventAccessKey;
}