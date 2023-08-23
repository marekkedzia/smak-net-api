import { UserId } from "../../../utils/schemas/user.id";
import { WeddingId, WeddingName } from "./wedding";

export interface WeddingRouterPort {
  createWeddingEvent: (userId: UserId, name: WeddingName) => Promise<WeddingId>;
}