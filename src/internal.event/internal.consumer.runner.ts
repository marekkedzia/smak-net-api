import { INTERNAL_EVENT } from "./internal.event.emitter";
import EventEmitter from "events";
import { logger } from "../utils/logger";
import { EventHandler } from "./schemas/event.handler";

export class InternalConsumerRunner {
  eventHandlers: EventHandler[];

  constructor(private eventEmitter: EventEmitter, eventHandlers?: EventHandler[]) {
    this.eventHandlers = eventHandlers || [];
  }

  startConsumer = () => this.eventEmitter.on(INTERNAL_EVENT, async event => {
      logger.info("[INTERNAL_CONSUMER] Received message", event);
      await this.eventHandlers.forEach((eventHandler: EventHandler) =>
        eventHandler.canHandle(event) && eventHandler.handle(event));
    }
  );

  addHandlers = (eventHandlers: EventHandler[]) => {
    this.eventHandlers = [...this.eventHandlers, ...eventHandlers];
  };
}
