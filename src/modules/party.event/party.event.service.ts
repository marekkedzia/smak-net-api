import { IdService } from "../../services/id.service";
import { DateService } from "../../services/date.service";
import { PartyEvent, PartyEventId, PartyEventName } from "./schemas/party.event";
import { PartyEventState } from "./schemas/party.event.states";
import { UserId } from "../../utils/schemas/user.id";
import { Repository } from "../../utils/schemas/repository";


export const createPartyEvent =
  (partyEventRepository: Repository<PartyEvent>) =>
    async (userId: UserId, name: PartyEventName): Promise<PartyEventId> => {
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
      await partyEventRepository.insertOne(event);

      return event.id;
    };
