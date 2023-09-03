import { PhotoInfoRepository } from "../modules/photo/photo.info.repository";
import { AwsApi } from "../apis/aws.api";
import { PhotoServicePort } from "../modules/photo/schemas/photo.service.port";
import { PhotoService } from "../modules/photo/photo.service";
import { PhotoRouter } from "../modules/photo/photo.router";

const photoRepository = new PhotoInfoRepository();
const photoServiceAdapter: PhotoServicePort = {
  providePutFileUrl: new AwsApi().obtainPutUrl
};
const photoService = new PhotoService(photoRepository, photoServiceAdapter);

export const photoRouter = new PhotoRouter(photoService);