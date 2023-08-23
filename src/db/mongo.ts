import { Collection, Db, MongoClient } from "mongodb";
import { Wedding } from "../modules/wedding/schemas/wedding";

export class Mongo {
  //@ts-ignore
  private static mongo: Db;
  //@ts-ignore
  private static client: MongoClient;

  public static connect = (url: string): Promise<Db> =>
    MongoClient.connect(url, { ignoreUndefined: true })
      .then((c) => (this.client = c))
      .then((c) => (this.mongo = c.db()))
      .then((db) => db);

  public static close = () => this.client.close();
  public static weddings = (): Collection<Wedding> => this.mongoCollection<Wedding>("weddings");
  //@ts-ignore
  private static mongoCollection = <T>(name: string) => this.mongo.collection<T>(name);
}
