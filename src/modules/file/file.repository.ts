import { FileInfo } from "./file.interfaces";
import { Mongo } from "../../db/mongo";

export class FileRepository {
  public static createFileInfo = async (fileInfo: FileInfo): Promise<void> => {
    await Mongo.files().insertOne(fileInfo);
  };
}