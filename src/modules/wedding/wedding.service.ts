import { internalLocalStorage } from "../../config/internal.local.storage.config";
import { WeddingId, WeddingName } from "./schemas/wedding";
import { UserId } from "../../utils/schemas/user.id";
import { logger } from "../../utils/logger";
import { WeddingRequestBody } from "./schemas/wedding.request.body";


/**
 * Create wedding for user.
 */
export const createWedding =
  (createWeddingEvent: (userId: UserId, name: WeddingName) => Promise<WeddingId>) =>
    async (weddingRequestBody: WeddingRequestBody): Promise<WeddingId> => {
      //const userId: UserId = internalLocalStorage.getUserId();
      const userId = "123" as UserId; //TODO

      const weddingId: WeddingId = await createWeddingEvent(userId, weddingRequestBody.name);

      logger.debug(`Wedding ${weddingId} created for user ${userId}`);
      return weddingId;
    };
