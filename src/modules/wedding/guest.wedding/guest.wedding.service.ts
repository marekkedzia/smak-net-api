import { GuestWeddingCredentials, Wedding, WeddingAccessKey } from "../schemas/wedding";
import { PartyEventService } from "../../party.event/party.event.service";
import { WeddingRepository } from "../wedding.repository";

export class GuestWeddingService {
  private partyEventService: PartyEventService;

  constructor(private weddingRepository: WeddingRepository) {
    this.partyEventService = new PartyEventService(weddingRepository);
  }

  getWeddingByAccessKey = async (weddingAccessKey: WeddingAccessKey): Promise<GuestWeddingCredentials> => {
    const mapWeddingToGuestWeddingCredentials = ({ id, createdAt, credentials, state }): GuestWeddingCredentials => ({
      id,
      createdAt,
      credentials,
      state
    });
    const wedding: Wedding = await this.partyEventService.getPartyEventByAccessKey(weddingAccessKey);

    return mapWeddingToGuestWeddingCredentials(wedding);
  };
}