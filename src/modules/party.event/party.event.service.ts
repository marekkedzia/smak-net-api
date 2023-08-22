import { IdService } from "../../services/id.service";
import { DateService } from "../../services/date.service";
import { PartyEvent, PartyEventId, PartyEventName } from "./schemas/party.event";
import { PartyEventState } from "./schemas/party.event.states";
import { PartyEventRepository } from "./party.event.repository";
import { UserId } from "../../utils/schemas/user.id";

export class PartyEventService {
  constructor(private partyEventRepository: PartyEventRepository) {
  }

  createPartyEvent = async (userId: UserId, name: PartyEventName): Promise<PartyEventId> => {
    const initEvent = (): PartyEvent => ({
      id: IdService.provideEventId(),
      createdAt: DateService.getDateNow(),
      ownerId: userId,
      credentials: {
        name
      },
      state: PartyEventState.PENDING_CONFIRMATION
    });

    const event: PartyEvent = initEvent();
    await this.partyEventRepository.insertOne(event);

    return event.id;
  };
}