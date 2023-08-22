import { UserId } from "../../../utils/schemas/user.id";
import { WeddingId, WeddingName } from "./wedding";

export interface WeddingServicePort {
  createWeddingEvent: (userId: UserId, name: WeddingName) => Promise<WeddingId>;
}