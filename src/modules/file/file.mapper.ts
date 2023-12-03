import { FileInfo } from "./file.interfaces";

export const mapFileInfo = (fi: FileInfo): FileInfo => ({
  id: fi.id,
  key: fi.key,
  resourceId: fi.resourceId,
  ownerId: fi.ownerId,
  filename: fi.filename,
  encoding: fi.encoding,
  mimeType: fi.mimeType,
  createdAt: fi.createdAt
});