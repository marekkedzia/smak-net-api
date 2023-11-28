import { FailedUploads } from "../file.interfaces";
import { logger } from "../../../utils/logger";
import { FilesUploadFailed } from "../../../errors/error.module";

export class ProductImageService {
  handleProductImageUpload = async (uploadedFiles: string[], failedUploads: FailedUploads): Promise<void> => {
    logger.silly(`Upload finished.
    Failed uploads: ${JSON.stringify(failedUploads)}.
    Succeeded uploads: ${JSON.stringify(uploadedFiles)}.`
    );

    if (Object.values(failedUploads).length !== 0)
      throw new FilesUploadFailed({ failedUploads, succeededUploads: uploadedFiles });
  };
}