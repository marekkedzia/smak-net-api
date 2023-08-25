import { WeddingRouter } from "../modules/wedding/wedding.router";
import {
  changePartyEventState,
  createPartyEvent, updatePartyEventAccessKey,
  getPartyEvent,
  getPartyEventsForUser
} from "../modules/party.event/party.event.service";
import { WeddingRepository } from "../modules/wedding/wedding.repository";
import { PartyEventId } from "../modules/party.event/schemas/party.event";
import { PartyEventState } from "../modules/party.event/schemas/party.event.states";
import { WeddingName } from "../modules/wedding/schemas/wedding";
import { WeddingService } from "../modules/wedding/wedding.service";

const weddingRepository = new WeddingRepository();

export const weddingRouter = new WeddingRouter(
  new WeddingService({
    createWedding: (weddingName: WeddingName) => createPartyEvent(weddingRepository)(weddingName, PartyEventState.PENDING_CONFIRMATION),
    readWeddingDetails: getPartyEvent(weddingRepository),
    readUsersWeddingList: getPartyEventsForUser(weddingRepository),
    closeWedding: (partyEventId: PartyEventId) =>
      changePartyEventState(weddingRepository)(partyEventId, PartyEventState.CLOSED),
    updateWeddingAccessKey: updatePartyEventAccessKey(weddingRepository)
  })
);