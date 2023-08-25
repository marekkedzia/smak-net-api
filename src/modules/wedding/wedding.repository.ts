import { Repository } from "../../utils/schemas/repository";
import { Wedding } from "./schemas/wedding";
import { Mongo } from "../../db/mongo";
import { Filter, UpdateFilter } from "mongodb";

export class WeddingRepository implements Repository<Wedding> {
  insertOne = async (entity: Wedding): Promise<void> => {
    await Mongo.weddings().insertOne(entity);
  };
  findOne = async (query: Filter<Wedding>): Promise<Wedding | null> => Mongo.weddings().findOne(query);
  findMany = async (query: Filter<Wedding>): Promise<Wedding[]> => Mongo.weddings().find(query).toArray();
  findOneAndUpdate = async (query: Filter<Wedding>, update: UpdateFilter<Wedding>): Promise<Wedding | null> =>
    Mongo.weddings().findOneAndUpdate(query, update).then((r) => r.value);
  updateOne = async (query: Filter<Wedding>, update: UpdateFilter<Wedding>): Promise<{ modifiedCount: number }> =>
    Mongo.weddings().updateOne(query, update).then((r) => ({ modifiedCount: r.modifiedCount }));
}