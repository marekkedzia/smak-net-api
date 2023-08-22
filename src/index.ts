import { app } from "./app";
import { logger } from "./utils/logger";
import { appConfig } from "./config/app.config";
import { mongo } from "./config/db.config";
import { internalConsumerRunner } from "./config/internal.event.emitter.config";
import { getEventHandlers } from "./config/event.handlers.config";

mongo.connect(appConfig.MONGO_URL)
  .then(() => {
      app.listen(appConfig.PORT, () => {
        logger.info(`Server listening on port ${appConfig.PORT}`);
      });

     internalConsumerRunner.addHandlers(getEventHandlers());
      internalConsumerRunner.startConsumer();
    }
  );
