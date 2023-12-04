import { Opaque } from "ts-opaque";
import { PaymentObject } from "../payment/payment.interfaces";
import { DatabaseObject } from "../../utils/schemas/database.object";

export type OrderId = Opaque<string, Order>;

export type Order = OrderRequest & PaymentObject & DatabaseObject<OrderId>;

export type OrderRequest = {
  note: string;
  resourceId: string;
};