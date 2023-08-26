import {
  Wedding,
  WeddingAccessKey,
  WeddingId,
  WeddingListElement,
  WeddingState
} from "../schemas/wedding";
import { logger } from "../../../utils/logger";
import { WeddingRequestBody } from "../schemas/wedding.request.body";
import { internalLocalStorage } from "../../../config/internal.local.storage.config";
import { Forbidden } from "../../../errors/error.module";
import { ForbiddenReasons } from "../../../errors/error.datas";
import { PartyEventState } from "../../party.event/schemas/party.event.states";
import { IdService } from "../../../services/id.service";
import { WeddingRepository } from "../wedding.repository";
import { PartyEventService } from "../../party.event/party.event.service";

export class OwnerWeddingService {
  private partyEventService: PartyEventService;

  constructor(private weddingRepository: WeddingRepository) {
    this.partyEventService = new PartyEventService(weddingRepository);
  }

  createWedding = async (weddingRequestBody: WeddingRequestBody): Promise<WeddingId> => {

    const weddingId: WeddingId = await this.partyEventService.createPartyEvent(weddingRequestBody.name, PartyEventState.PENDING_CONFIRMATION);

    logger.debug(`Wedding ${weddingId} created for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()} `);
    return weddingId;
  };

  readWeddingDetails = async (weddingId: WeddingId): Promise<Wedding> => {
    const mapWedding = ({ id, createdAt, credentials, state, ownerId }): Wedding => ({
      id,
      createdAt,
      credentials,
      state,
      ownerId
    });

    const wedding: Wedding = await this.partyEventService.getPartyEvent(weddingId);

    logger.debug(`Wedding ${weddingId} retrieved for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
    return mapWedding(wedding);
  };

  readUsersWeddingsList = async (): Promise<WeddingListElement[]> => {
    const mapWeddingToList = ({ id, createdAt, state }): WeddingListElement => ({
      id,
      createdAt,
      state
    });

    const weddingList: Wedding[] = await this.partyEventService.getPartyEventsForUser();
    logger.debug(`Wedding list retrieved for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
    return weddingList.map(mapWeddingToList);
  };

  closeWedding = async (weddingId: WeddingId): Promise<void> => {
    const wedding: Wedding = await this.partyEventService.getPartyEvent(weddingId);

    if (wedding.state === PartyEventState.CLOSED)
      throw new Forbidden(ForbiddenReasons.PARTY_EVENT_ALREADY_CLOSED);

    await this.partyEventService.changePartyEventState(weddingId, PartyEventState.CLOSED);
    logger.debug(`Wedding ${weddingId} closed for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
  };

  generateWeddingAccessKey = async (weddingId: WeddingId): Promise<WeddingAccessKey> => {
    const wedding: Wedding = await this.partyEventService.getPartyEvent(weddingId);

    const UNALLOWED_STATES: WeddingState[] = [PartyEventState.PENDING_CONFIRMATION, PartyEventState.CLOSED];
    if (UNALLOWED_STATES.includes(wedding.state))
      throw new Forbidden(ForbiddenReasons.PARTY_EVENT_IS_NOT_OPEN);

    const weddingAccessKey: WeddingAccessKey = await this.partyEventService.updatePartyEventAccessKey(weddingId, IdService.providePartyEventAccessKey());

    logger.debug(`Wedding ${weddingId} access key generated for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
    return weddingAccessKey;
  };
}