import { Db, Document, MongoClient } from "mongodb";
import { Product } from "../modules/product/product.interfaces";
import { FileInfo } from "../modules/file/file.interfaces";
import { Cart } from "../modules/cart/cart.interfaces";
import { Order } from "../modules/order/order.interfaces";
import { Payment } from "../modules/payment/payment.interfaces";

export class Mongo {
  private static mongo: Db;
  private static client: MongoClient;

  public static connect = (url: string): Promise<Db> =>
    MongoClient.connect(url, { ignoreUndefined: true })
      .then((c) => (this.client = c))
      .then((c) => (this.mongo = c.db()))
      .then((db) => db);

  public static close = () => this.client.close();
  public static products = () => this.mongoCollection<Product>("products");
  public static files = () => this.mongoCollection<FileInfo>("files");
  public static carts = () => this.mongoCollection<Cart>("carts");
  public static payments = () => this.mongoCollection<Payment>("payments");
  public static orders = () => this.mongoCollection<Order>("orders");
  private static mongoCollection = <T extends Document>(name: string) => this.mongo.collection<T>(name);
}