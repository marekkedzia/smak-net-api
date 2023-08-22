import { app } from "./app";
import { logger } from "./utils/logger";
import { appConfig } from "./config/app.config";


app.listen(appConfig.PORT, () => {
  logger.info(`Server listening on port ${appConfig.PORT}`);
});