import { EventEmitter } from "events";
import { IdService } from "../services/id.service";
import { HandledEventTypes } from "./schemas/handled.event.types";
import { InternalEvent } from "./schemas/internal.event";
import { HandledEventPayloads } from "./schemas/handled.event.payloads";

export const INTERNAL_EVENT = "internal_event";

export class InternalEventEmitter {
  constructor(private eventEmitter: EventEmitter) {
  }

  createEvent = (eventType: HandledEventTypes, payload: HandledEventPayloads): InternalEvent => ({
      eventId: IdService.provideInternalEventId(),
      eventType,
      createdAt: Date.now(),
      payload
    }
  );

  emit(type: HandledEventTypes, payload: HandledEventPayloads) {
    this.eventEmitter.emit(INTERNAL_EVENT, this.createEvent(type, payload));
  }
}

