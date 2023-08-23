import { Document, Filter, OptionalUnlessRequiredId, UpdateFilter } from "mongodb";
import { Wedding } from "../../modules/wedding/schemas/wedding";

export interface Repository<T extends Document> {
  insertOne: (entity: OptionalUnlessRequiredId<T>) => Promise<void>;
  findOne: (query: Filter<T>) => Promise<T | null>;
  findMany: (query: Filter<T>) => Promise<T[]>;
  findOneAndUpdate: (query: Filter<T>, update: UpdateFilter<Wedding>) => Promise<T | null>;
  updateOne: (query: Filter<T>, update: UpdateFilter<Wedding>) => Promise<void>;
}
