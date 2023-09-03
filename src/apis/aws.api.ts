import { Opaque } from "ts-opaque";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { appConfig } from "../config/app.config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const DEFAULT_TOKEN_TTL_IN_SECONDS = 3600;

export class AwsApi {
  private readonly s3Client;

  constructor() {
    const clientParams = { region: appConfig.AWS_REGION };
    this.s3Client = new S3Client(clientParams);
  }

  obtainPutUrl = async (fileId: FileId): Promise<PutFileUrl> => {
    const command: PutObjectCommand = new PutObjectCommand({
      Bucket: appConfig.S3_BUCKET_NAME,
      Key: fileId
    });

    const url: string = await getSignedUrl(this.s3Client, command, { expiresIn: DEFAULT_TOKEN_TTL_IN_SECONDS });
    return url as PutFileUrl;
  };
}

export type FileId = Opaque<"file-id", string>
export type GetFileUrl = Opaque<"get-file-url", string>
export type PutFileUrl = Opaque<"put-file-url", string>