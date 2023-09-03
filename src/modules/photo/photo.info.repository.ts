import { FileInfo } from "../party.event/party.event.file.service/schema/file.info";
import { Repository } from "../../utils/schemas/repository";
import { Mongo } from "../../db/mongo";
import { Filter, UpdateFilter } from "mongodb";

export class PhotoInfoRepository implements Repository<FileInfo>{
  insertOne = async (entity: FileInfo): Promise<void> => {
    await Mongo.photosInfo().insertOne(entity);
  };
  findOne = async (query: Filter<FileInfo>): Promise<FileInfo | null> => Mongo.photosInfo().findOne(query);
  findMany = async (query: Filter<FileInfo>): Promise<FileInfo[]> => Mongo.photosInfo().find(query).toArray();
  findOneAndUpdate = async (query: Filter<FileInfo>, update: UpdateFilter<FileInfo>): Promise<FileInfo | null> =>
    Mongo.photosInfo().findOneAndUpdate(query, update).then((r) => r.value);
  updateOne = async (query: Filter<FileInfo>, update: UpdateFilter<FileInfo>): Promise<{ modifiedCount: number }> =>
    Mongo.photosInfo().updateOne(query, update).then((r) => ({ modifiedCount: r.modifiedCount }));
}