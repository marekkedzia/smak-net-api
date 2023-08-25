import { Wedding, WeddingAccessKey, WeddingId, WeddingName } from "./wedding";

export interface WeddingServicePort {
  createWedding: (name: WeddingName) => Promise<WeddingId>;
  readWeddingDetails: (weddingId: WeddingId) => Promise<Wedding>;
  readUsersWeddingList: () => Promise<Wedding[]>;
  closeWedding: (weddingId: WeddingId) => Promise<void>;
  updateWeddingAccessKey: (partyEventId: WeddingId, partyEventAccessKey: WeddingAccessKey) => Promise<WeddingAccessKey>;
}