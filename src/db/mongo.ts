import { Collection, Db, Document, MongoClient } from "mongodb";

export class Mongo {
  private static mongo: Db;
  private static client: MongoClient;

  public static connect = (url: string): Promise<Db> =>
    MongoClient.connect(url, { ignoreUndefined: true })
      .then((c) => (this.client = c))
      .then((c) => (this.mongo = c.db()))
      .then((db) => db);

  public static close = () => this.client.close();
  private static mongoCollection = <T extends Document>(name: string) => this.mongo.collection<T>(name);
}
