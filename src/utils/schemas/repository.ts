import { Collection, Document, OptionalUnlessRequiredId, WithId } from "mongodb";

export abstract class Repository<T extends Document> {
  private collection: Collection<T>;

  protected constructor(collection: Collection<T>) {
    this.collection = collection;
  }

  insertOne = async (entity: OptionalUnlessRequiredId<T>): Promise<void> => {
    await this.collection.insertOne(entity);
  };

  findOne = async (query): Promise<T | null> => {
    const result: WithId<T> | null = await this.collection.findOne(query);
    return result as T | null;
  };
  findMany = async (query): Promise<T[]> => {
    const result: WithId<T>[] = await this.collection.find(query).toArray();
    return result as T[];
  };

  findOneAndUpdate = async (query, update): Promise<T | null> => {
    const result = await this.collection.findOneAndUpdate(query, update);
    return result.value as T | null;
  };

  updateOne = async (query, update): Promise<void> => {
    await this.collection.updateOne(query, update);
  };
}
