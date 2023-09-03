import { FileId, PutFileUrl } from "../../../apis/aws.api";
import { FileInfo, FileCredentials } from "./schema/file.info";
import { IdUtils } from "../../../utils/id.utils";
import { FileState } from "./schema/file.state";
import { DateUtils } from "../../../utils/date.utils";
import { UserId } from "../../../utils/schemas/user.id";
import { internalLocalStorage } from "../../../config/internal.local.storage.config";
import { Repository } from "../../../utils/schemas/repository";

export class PartyEventFileService {
  constructor(
    private photoRepository: Repository<FileInfo>,
    private fileService: { providePutFileUrl: (fileId: FileId) => Promise<PutFileUrl> }
  ) {
  }

  obtainPutPhotoUrl = async (photoCredentials: FileCredentials): Promise<PutFileUrl> => {
    const userId: UserId = internalLocalStorage.getUserId();
    const generatePhotoInfo = (): FileInfo => ({
      id: IdUtils.providePhotoId(),
      ownerId: userId,
      createdAt: DateUtils.getDateNow(),
      credentials: photoCredentials,
      state: FileState.PENDING_UPLOAD
    });

    const photoInfo: FileInfo = generatePhotoInfo();
    const putFileUrl: PutFileUrl = await this.fileService.providePutFileUrl(photoInfo.id);
    await this.photoRepository.insertOne(photoInfo);

    return putFileUrl;
  };
}