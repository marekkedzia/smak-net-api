import { FailedUploads } from "./file.interfaces";
import { UserId } from "../../utils/schemas/user.id";
import { internalLocalStorage } from "../../config/internal.local.storage.config";
import { logger } from "../../utils/logger";
import { FilesUploadFailed } from "../../errors/error.module";

export class ProductImageService {
  handleProductImageUpload = async (uploadedFiles: string[], failedUploads: FailedUploads): Promise<void> => {
    const userId: UserId = internalLocalStorage.getUserId();

    if (uploadedFiles.length > 0) {
      logger.debug(`Lab results upload confirmed for patient: ${userId}.`);
    }

    logger.info(`Upload finished for user: ${userId}.
    Failed uploads: ${JSON.stringify(failedUploads)}.
    Succeeded uploads: ${JSON.stringify(uploadedFiles)}.`
    );

    if (Object.values(failedUploads).length !== 0)
      throw new FilesUploadFailed({ failedUploads, succeededUploads: uploadedFiles });
  };
}