import { WeddingRouter } from "../modules/wedding/wedding.router";
import { createPartyEvent } from "../modules/party.event/party.event.service";
import { WeddingRepository } from "../modules/wedding/wedding.repository";

const weddingRepository = new WeddingRepository();

export const weddingRouter = new WeddingRouter(
  {
    createWeddingEvent: createPartyEvent(weddingRepository)
  }
);