import { DatabaseObject } from "../../utils/schemas/database.object";
import { Opaque } from "ts-opaque";
import { ProductId } from "../product/product.interfaces";
import { ServerDateType } from "../../utils/date.utils";

export type CartId = Opaque<string, Cart>

export enum CartState {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  AWAITING_PAYMENT = "AWAITING_PAYMENT",
  PAID = "PAID"
}

export type Cart = CartResponse & DatabaseObject<CartId>

export type CartResponse = {
  id: CartId,
  products: {
    id: ProductId,
    count: number
  }[],
  modifiedAt: ServerDateType,
  state: CartState
}