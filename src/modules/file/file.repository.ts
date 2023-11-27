import { FileId, FileInfo } from "./file.interfaces";
import { Mongo } from "../../db/mongo";

export class FileRepository {
  public static createFileInfo = async (fileInfo: FileInfo): Promise<void> => {
    await Mongo.files().insertOne(fileInfo);
  };

  public static findManyByResourceId = async (resourceId: string): Promise<FileInfo[]> =>
    Mongo.files().find({ resourceId }).toArray();

  public static findOneById = async (id: FileId): Promise<FileInfo | null> =>
    Mongo.files().findOne({ id });
}