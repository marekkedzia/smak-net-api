import { Collection, Db, Document, MongoClient } from "mongodb";
import { Wedding } from "../modules/wedding/schemas/wedding";
import { FileInfo } from "../modules/party.event/party.event.file.service/schema/file.info";

export class Mongo {
  private static mongo: Db;
  private static client: MongoClient;

  public static connect = (url: string): Promise<Db> =>
    MongoClient.connect(url, { ignoreUndefined: true })
      .then((c) => (this.client = c))
      .then((c) => (this.mongo = c.db()))
      .then((db) => db);

  public static close = () => this.client.close();
  public static weddings = (): Collection<Wedding> => this.mongoCollection<Wedding>("weddings");
  public static photosInfo = (): Collection<FileInfo> => this.mongoCollection<FileInfo>("photosInfo");
  private static mongoCollection = <T extends Document>(name: string) => this.mongo.collection<T>(name);
}
