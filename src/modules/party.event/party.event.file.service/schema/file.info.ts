import { Opaque } from "ts-opaque";
import { DatabaseObject } from "../../../../utils/schemas/database.object";
import { FileState } from "./file.state";
import { FileId, GetFileUrl } from "../../../../apis/aws.api";

export interface FileInfo extends DatabaseObject<FileId, FileCredentials> {
  state: FileState;
}

export interface FileCredentials {
  author: PhotoAuthor;
  description: PhotoDescription;
  sizeInBytes: number;
  getUrl?: GetFileUrl;
}

export type PhotoAuthor = Opaque<"author", FileInfo>
export type PhotoDescription = Opaque<"description", FileInfo>