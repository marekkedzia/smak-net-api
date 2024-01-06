import { Opaque } from "ts-opaque";
import { DatabaseObject } from "../../utils/schemas/database.object";
import { ProductId } from '../product/product.interfaces';
import { CartId } from '../cart/cart.interfaces';
import { PaymentObject } from '../payment/payment.interfaces';

export type OrderId = Opaque<string, Order>;

export type Order = OrderRequest & PaymentObject & DatabaseObject<OrderId>;

export type OrderRequest = {
  note: string;
  resourceId: CartId;
};

export type OrderCartItem = {
    id: ProductId;
    count: number;
}