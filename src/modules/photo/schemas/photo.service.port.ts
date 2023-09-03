import { FileId, PutFileUrl } from "../../../apis/aws.api";

export interface PhotoServicePort {
  providePutFileUrl: (fileId: FileId) => Promise<PutFileUrl>;
}