import { WeddingId, WeddingName } from "./schemas/wedding";
import { UserId } from "../../utils/schemas/user.id";
import { logger } from "../../utils/logger";
import { WeddingRequestBody } from "./schemas/wedding.request.body";
import { internalLocalStorage } from "../../config/internal.local.storage.config";

export const createWedding =
  (insertWeedingEvent: (userId: UserId, name: WeddingName) => Promise<WeddingId>) =>
    async (weddingRequestBody: WeddingRequestBody): Promise<WeddingId> => {
      const userId: UserId = internalLocalStorage.getUserId();

      const weddingId: WeddingId = await insertWeedingEvent(userId, weddingRequestBody.name);

      logger.debug(`Wedding ${weddingId} created for user ${userId}`);
      return weddingId;
    };
