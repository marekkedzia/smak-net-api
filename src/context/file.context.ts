import { FileService } from "../modules/file/file.service";
import { FileRouter } from "../modules/file/file.router";
import { DevService } from "../modules/dev/dev.service";
import { ProductImageService } from "../modules/file/handlers.services/product.image.service";
import { StateService } from "../modules/state/state.service";

const storeFileHandler = DevService.storeFile;
const getFileHandler = DevService.getFile;
export const fileService = new FileService(storeFileHandler, getFileHandler);
const productImageHandlers = {
  handleProductImageUpload: new ProductImageService().handleProductImageUpload,
  validateImageUploadAccess: new StateService().validateImageUploadAccess
};
export const fileRouter = new FileRouter(fileService, productImageHandlers);