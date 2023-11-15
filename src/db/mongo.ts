import { Db, Document, MongoClient } from "mongodb";
import { Product } from "../modules/product/product.interfaces";
import { FileInfo } from "../modules/file/file.interfaces";

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
  private static mongoCollection = <T extends Document>(name: string) => this.mongo.collection<T>(name);
}