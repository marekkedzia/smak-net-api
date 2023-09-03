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
import { IdUtils } from "../../../utils/id.utils";
import { WeddingRepository } from "../wedding.repository";
import { PartyEventService } from "../../party.event/party.event.service";
import { mapWedding, mapWeddingToListElement } from "../wedding.mappers";

export class OwnerWeddingService {
  private partyEventService: PartyEventService;

  constructor(private weddingRepository: WeddingRepository) {
    this.partyEventService = new PartyEventService(weddingRepository);
  }

  createWedding = async (weddingRequestBody: WeddingRequestBody): Promise<WeddingId> => {

    const weddingId: WeddingId = await this.partyEventService.createPartyEvent(
      weddingRequestBody.name,
      weddingRequestBody.date,
      PartyEventState.PENDING_CONFIRMATION
    );

    logger.debug(`Wedding ${weddingId} created for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()} `);
    return weddingId;
  };

  getWedding = async (weddingId: WeddingId): Promise<Wedding> => {
    const wedding: Wedding = await this.partyEventService.getPartyEvent(weddingId);

    logger.debug(`Wedding ${weddingId} retrieved for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
    return mapWedding(wedding);
  };

  getWeddingsList = async (): Promise<WeddingListElement[]> => {

    const weddingList: Wedding[] = await this.partyEventService.getPartyEventsForUser();
    logger.debug(`Wedding list retrieved for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
    return weddingList.map(mapWeddingToListElement);
  };

  closeWedding = async (weddingId: WeddingId): Promise<void> => {
    const wedding: Wedding = await this.partyEventService.getPartyEvent(weddingId);

    if (wedding.state === PartyEventState.CLOSED)
      throw new Forbidden(ForbiddenReasons.PARTY_EVENT_ALREADY_CLOSED);

    await this.partyEventService.changePartyEventState(weddingId, PartyEventState.CLOSED);
    logger.debug(`Wedding ${weddingId} closed for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
  };

  updateWeddingAccessKey = async (weddingId: WeddingId): Promise<WeddingAccessKey> => {
    const wedding: Wedding = await this.partyEventService.getPartyEvent(weddingId);

    const UNALLOWED_STATES: WeddingState[] = [PartyEventState.PENDING_CONFIRMATION, PartyEventState.CLOSED];
    if (UNALLOWED_STATES.includes(wedding.state))
      throw new Forbidden(ForbiddenReasons.PARTY_EVENT_IS_NOT_OPEN);

    const weddingAccessKey: WeddingAccessKey = await this.partyEventService.updatePartyEventAccessKey(weddingId, IdUtils.providePartyEventAccessKey());

    logger.debug(`Wedding ${weddingId} access key generated for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
    return weddingAccessKey;
  };
}