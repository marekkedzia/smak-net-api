import { Order, OrderId } from "./order.interfaces";
import { Mongo } from "../../db/mongo";
import { UserId } from "../../utils/schemas/user.id";

export class OrderRepository {
  public static createOrder = async (order: Order): Promise<void> => {
    await Mongo.orders().insertOne(order);
  };

  public static findAllByOwnerId = (userId: UserId): Promise<Order[]> =>
    Mongo.orders().find({ ownerId: userId }).toArray();

  public static getOrderById = (orderId: OrderId): Promise<Order | null> =>
    Mongo.orders().findOne({ id: orderId });
}