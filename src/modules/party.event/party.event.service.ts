import { IdService } from "../../services/id.service";
import { DateService } from "../../services/date.service";
import { PartyEvent, PartyEventAccessKey, PartyEventId, PartyEventName } from "./schemas/party.event";
import { PartyEventState } from "./schemas/party.event.states";
import { UserId } from "../../utils/schemas/user.id";
import { Repository } from "../../utils/schemas/repository";
import { ResourceNotFoundError } from "../../errors/error.module";
import { Resource } from "../../errors/error.datas";
import { internalLocalStorage } from "../../config/internal.local.storage.config";
import { WeddingAccessKey } from "../wedding/schemas/wedding";


export const createPartyEvent =
  (partyEventRepository: Repository<PartyEvent>) =>
    async (name: PartyEventName, state: PartyEventState): Promise<PartyEventId> => {
      const userId: UserId = internalLocalStorage.getUserId();

      const initEvent = (): PartyEvent => ({
        id: IdService.provideEventId(),
        createdAt: DateService.getDateNow(),
        ownerId: userId,
        credentials: {
          name
        },
        state
      });

      const event: PartyEvent = initEvent();
      await partyEventRepository.insertOne(event);

      return event.id;
    };

export const getPartyEvent =
  (partyEventRepository: Repository<PartyEvent>) =>
    async (partyEventId: PartyEventId): Promise<PartyEvent> => {
      const userId: UserId = internalLocalStorage.getUserId();
      const event: PartyEvent | null = await partyEventRepository.findOne({ id: partyEventId, ownerId: userId });

      if (!event)
        throw new ResourceNotFoundError(Resource.EVENT);

      return event;
    };

export const getPartyEventsForUser =
  (partyEventRepository: Repository<PartyEvent>) =>
    async (): Promise<PartyEvent[]> => {
      const userId: UserId = internalLocalStorage.getUserId();
      return partyEventRepository.findMany({ ownerId: userId });
    };

export const updatePartyEventAccessKey = //TODO - this key should be stored in aws secrets manager
  (partyEventRepository: Repository<PartyEvent>) =>
    async (partyEventId: PartyEventId, accessKey: PartyEventAccessKey): Promise<WeddingAccessKey> => {
      const userId: UserId = internalLocalStorage.getUserId();

      await partyEventRepository.updateOne({
          id: partyEventId,
          ownerId: userId
        },
        { $set: { "credentials.accessKey": accessKey } }
      );

      return accessKey;
    };

export const changePartyEventState =
  (partyEventRepository: Repository<PartyEvent>) =>
    async (partyEventId: PartyEventId, updatedState: PartyEventState): Promise<void> => {
      const userId: UserId = internalLocalStorage.getUserId();

      await partyEventRepository.updateOne({
        id: partyEventId,
        ownerId: userId
      }, { $set: { state: updatedState } });
    };