import { InternalEventId } from "../internal.event.id";
import { HandledEventTypes } from "./handled.event.types";
import { HandledEventPayloads } from "./handled.event.payloads";

export interface InternalEvent {
  eventId: InternalEventId;
  createdAt: number;
  eventType: HandledEventTypes;
  payload: HandledEventPayloads;
}