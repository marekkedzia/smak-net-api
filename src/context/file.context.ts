import { FileService } from "../modules/file/file.service";
import { FileRouter } from "../modules/file/file.router";
import { DevService } from "../modules/dev/dev.service";

const storeFileHandler = DevService.storeFile;
const getFileHandler = DevService.getFile;
export const fileService = new FileService(storeFileHandler, getFileHandler);
export const fileRouter = new FileRouter(fileService);