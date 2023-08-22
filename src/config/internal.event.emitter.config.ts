import EventEmitter from "events";
import { InternalConsumerRunner } from "../internal.event/internal.consumer.runner";
import { InternalEventEmitter } from "../internal.event/internal.event.emitter";

export const eventEmitterConfig = () => {
  const nodeEventEmitter = new EventEmitter();
  const internalConsumerRunner =
    new InternalConsumerRunner(nodeEventEmitter);

  return { internalEventEmitter: new InternalEventEmitter(nodeEventEmitter), internalConsumerRunner };
};

export const { internalEventEmitter, internalConsumerRunner } = eventEmitterConfig();