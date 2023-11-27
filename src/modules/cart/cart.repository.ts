import { Mongo } from "../../db/mongo";
import { Cart, CartId, CartState } from "./cart.interfaces";
import { OwnerId } from "../../utils/schemas/owner.id";

export class CartRepository {
  public static createCart = async (cart: Cart): Promise<void> => {
    await Mongo.carts().insertOne(cart);
  };

  public static findOneById = async (id: CartId): Promise<Cart | null> =>
    Mongo.carts().findOne({ id });
  public static updateCart = async (cart: Cart): Promise<void> => {
    await Mongo.carts().updateOne({ id: cart.id }, { $set: cart });
  };
  public static findActiveOneByOwnerId = async (ownerId: OwnerId): Promise<Cart | null> =>
    CartRepository.findOneByOwnerIdAndState(ownerId, CartState.ACTIVE);
  public static findOneByOwnerIdAndState = async (ownerId: OwnerId, state: CartState): Promise<Cart | null> =>
    Mongo.carts().findOne({ ownerId, state });
}