import { DatabaseObject } from "../../utils/schemas/database.object";
import { Opaque } from "ts-opaque";
import { Resource } from "../../utils/constants/resources.names";

export type Payment = {
  resourceType: Resource,
  sessionId: PaymentSessionId;
  lineItems: LineItem[]
}  & PaymentRequest & DatabaseObject<PaymentId>

export type PaymentObject = {
  amount: number;
  currency: string;
}

export type PaymentRequest = {
  resourceId: string;
  successUrl: string;
  cancelUrl: string;
}

export type PaymentSessionId = Opaque<string, Payment>;

export type PaymentId = Opaque<string, Payment>;

export type ApiPaymentRequest = {
  lineItems: LineItem[];
  successUrl: string;
  cancelUrl: string;
}


export interface LineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
    };
    unit_amount: number;
  };
  quantity: number;
}