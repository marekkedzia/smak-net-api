import { DatabaseObject } from "../../utils/schemas/database.object";
import { Opaque } from "ts-opaque";
import { Resource } from "../../utils/constants/resources.names";

export type Payment = {
  resourceType: Resource,
  paymentKey: PaymentKey;
} & PaymentObject & PaymentRequest & DatabaseObject<PaymentId>

export type PaymentObject = {
  amount: number;
  currency: string;
}

export type PaymentRequest = {
  resourceId: string;
}

export type PaymentKey = Opaque<string, Payment>;

export type PaymentId = Opaque<string, Payment>;

export type ApiPaymentRequest = {}