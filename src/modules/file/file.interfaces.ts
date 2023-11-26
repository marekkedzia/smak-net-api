import { Opaque } from "ts-opaque";
import { DatabaseObject } from "../../utils/schemas/database.object";
import { Readable } from "stream";

export type FileRequest = { filename: string, encoding: string, mimeType: string }

export type FileInfo = { key: FileKey, resourceId: string } & FileRequest & DatabaseObject<FileId>

export type FailedUploads = { [filename: string]: string }

export type FileKey = Opaque<string, FileRequest>

export type FileId = Opaque<string, FileInfo>

export type FileUploadResult = { fileId: FileId, fileKey: FileKey }

export type FileDownloadResult = { content: Readable, mimeType: string }