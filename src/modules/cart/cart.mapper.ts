import { Cart, CartResponse, CartState } from "./cart.interfaces";

export const mapCartToCartResponse = (c: Cart): CartResponse => ({
    products: c.products,
    id: c.id,
    state: c.state,
    modifiedAt: c.modifiedAt
  }
);

export const mapStringToCartState = (state: string): CartState => state as CartState;