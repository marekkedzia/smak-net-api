import { Opaque } from "ts-opaque";
import { DatabaseObject } from "../../utils/schemas/database.object";
import { ProductId } from "../product/product.interfaces";

export type FileRequest = { name: string, encoding: string, mimeType: string }

export type FileInfo = { key: FileKey, productId: ProductId } & FileRequest & DatabaseObject<FileId>

export type FailedUploads = { [filename: string]: string }

export type FileKey = Opaque<string, FileRequest>

export type FileId = Opaque<string, FileInfo>