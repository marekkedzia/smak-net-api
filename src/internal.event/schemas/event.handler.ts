import { InternalEvent } from "./internal.event";

export interface EventHandler {
  handlers: { [key in string]: (event: InternalEvent) => void };
  handle: (event: InternalEvent) => void;
  canHandle: (event: InternalEvent) => boolean;
}