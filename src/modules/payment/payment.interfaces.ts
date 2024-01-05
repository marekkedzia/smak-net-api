import { DatabaseObject } from "../../utils/schemas/database.object";
import { Opaque } from "ts-opaque";
import { Resource } from "../../utils/constants/resources.names";

export type Payment = {
  resourceType: Resource,
  sessionId: PaymentSessionId;
} & PaymentObject & PaymentRequest & DatabaseObject<PaymentId>

export type PaymentObject = {
  amount: number;
  currency: string;
}

export type PaymentRequest = {
  resourceId: string;
}

export type PaymentSessionId = Opaque<string, Payment>;

export type PaymentId = Opaque<string, Payment>;

export type ApiPaymentRequest = {
  amount: number;
}