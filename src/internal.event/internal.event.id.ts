import { Opaque } from "ts-opaque";
import { InternalEvent } from "./schemas/internal.event";

export type InternalEventId = Opaque<"id", InternalEvent>;