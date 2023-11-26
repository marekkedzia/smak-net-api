import { FileId, FileInfo } from "./file.interfaces";
import { Mongo } from "../../db/mongo";

export class FileRepository {
  public static createFileInfo = async (fileInfo: FileInfo): Promise<void> => {
    await Mongo.files().insertOne(fileInfo);
  };

  public static findOneById = async (id: FileId): Promise<FileInfo | null> =>
    Mongo.files().findOne({ id });
}