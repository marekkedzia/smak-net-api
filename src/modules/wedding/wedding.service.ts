import { Wedding, WeddingAccessKey, WeddingId, WeddingListElement, WeddingName, WeddingState } from "./schemas/wedding";
import { logger } from "../../utils/logger";
import { WeddingRequestBody } from "./schemas/wedding.request.body";
import { internalLocalStorage } from "../../config/internal.local.storage.config";
import { Forbidden, ResourceNotFoundError } from "../../errors/error.module";
import { ForbiddenReasons, Resource } from "../../errors/error.datas";
import { PartyEventState } from "../party.event/schemas/party.event.states";
import { PartyEvent } from "../party.event/schemas/party.event";
import { WeddingServicePort } from "./schemas/wedding.service.port";
import { IdService } from "../../services/id.service";

export class WeddingService {

  constructor(private weddingServiceAdapter: WeddingServicePort) {

  }

  createWedding = async (weddingRequestBody: WeddingRequestBody): Promise<WeddingId> => {

    const weddingId: WeddingId = await this.weddingServiceAdapter.createWedding(weddingRequestBody.name);

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

    const wedding: Wedding = await this.weddingServiceAdapter.readWeddingDetails(weddingId);
    logger.debug(`Wedding ${weddingId} retrieved for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
    return mapWedding(wedding);
  };

  readUsersWeddingsList = async (): Promise<WeddingListElement[]> => {
    const mapWeddingToList = ({ id, createdAt, state }): WeddingListElement => ({
      id,
      createdAt,
      state
    });

    const weddingList: Wedding[] = await this.weddingServiceAdapter.readUsersWeddingList();
    logger.debug(`Wedding list retrieved for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
    return weddingList.map(mapWeddingToList);
  };

  closeWedding = async (weddingId: WeddingId): Promise<void> => {
    const wedding: Wedding | null = await this.weddingServiceAdapter.readWeddingDetails(weddingId);

    if (!wedding)
      throw new ResourceNotFoundError(Resource.EVENT);

    if (wedding.state === PartyEventState.CLOSED)
      throw new Forbidden(ForbiddenReasons.PARTY_EVENT_ALREADY_CLOSED);

    await this.weddingServiceAdapter.closeWedding(weddingId);
    logger.debug(`Wedding ${weddingId} closed for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
  };

  generateWeddingAccessKey = async (weddingId: WeddingId): Promise<WeddingAccessKey> => {
    const event: PartyEvent = await this.weddingServiceAdapter.readWeddingDetails(weddingId);

    const UNALLOWED_STATES: WeddingState[] = [PartyEventState.PENDING_CONFIRMATION, PartyEventState.CLOSED];
    if (UNALLOWED_STATES.includes(event.state))
      throw new Forbidden(ForbiddenReasons.PARTY_EVENT_IS_NOT_OPEN);

    const weddingAccessKey: WeddingAccessKey = await this.weddingServiceAdapter.updateWeddingAccessKey(weddingId, IdService.providePartyEventAccessKey());

    logger.debug(`Wedding ${weddingId} access key generated for user ${internalLocalStorage.getUserId()} by request ${internalLocalStorage.getRequestId()}`);
    return weddingAccessKey;
  };
}