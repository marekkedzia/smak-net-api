import { Db, MongoClient } from "mongodb";
import { PartyEvent } from "../modules/party.event/schemas/party.event";

export class Mongo {
  //@ts-ignore
  private mongo: Db;
  //@ts-ignore
  private client: MongoClient;

  connect = (url: string): Promise<Db> =>
    MongoClient.connect(url, { ignoreUndefined: true })
      .then((c) => (this.client = c))
      .then((c) => (this.mongo = c.db()))
      .then((db) => db);

  close = () => this.client.close();
  partyEvents = () => this.mongoCollection<PartyEvent>("party-events");
  //@ts-ignore
  private mongoCollection = <T>(name: string) => this.mongo.collection<T>(name);
}
