import { Readable } from "stream";
import { FileKey } from "../file/file.interfaces";
import fs from "fs";
import path from "path";

export class DevService {
  public static storeFile = async (stream: Readable, fileKey: FileKey): Promise<void> => {
    const imagesDir = path.join(__dirname, "..", "images");
    const filePath = path.join(imagesDir, fileKey);

    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);

      stream.pipe(writeStream);

      writeStream.on("finish", resolve);
      writeStream.on("error", (error) => {
        fs.unlink(filePath, () => reject(error));
      });
    });
  };
}