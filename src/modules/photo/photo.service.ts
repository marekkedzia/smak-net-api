import { PartyEventFileService } from "../party.event/party.event.file.service/party.event.file.service";
import { PhotoInfoRepository } from "./photo.info.repository";
import { FileCredentials } from "../party.event/party.event.file.service/schema/file.info";
import { logger } from "../../utils/logger";
import { internalLocalStorage } from "../../config/internal.local.storage.config";
import { PhotoServicePort } from "./schemas/photo.service.port";
import { PutFileUrl } from "../../apis/aws.api";

export class PhotoService {
  private partyEventPhotoService: PartyEventFileService;

  constructor(private photoInfoRepository: PhotoInfoRepository, private photoServiceAdapter: PhotoServicePort) {
    this.partyEventPhotoService = new PartyEventFileService(photoInfoRepository, photoServiceAdapter);
  }

  obtainPutPhotoUrl = async (photoCredentials: FileCredentials): Promise<PutFileUrl> => {
    const putPhotoUrl: PutFileUrl = await this.partyEventPhotoService.obtainPutPhotoUrl(photoCredentials);

    logger.debug(`PutPhotoUrl obtained for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
    return putPhotoUrl;
  };
}