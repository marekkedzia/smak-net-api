import { Order, OrderId } from "./order.interfaces";
import { Mongo } from "../../db/mongo";

export class OrderRepository {
  public static getOrderById = (orderId: OrderId): Promise<Order | null> =>
    Mongo.orders().findOne({ id: orderId });
}