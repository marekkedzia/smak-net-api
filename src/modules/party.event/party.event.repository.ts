import { Repository } from "../../utils/schemas/repository";
import { PartyEvent } from "./schemas/party.event";
import { mongo } from "../../config/db.config";

export class PartyEventRepository extends Repository<PartyEvent> {
  constructor() {
    super(mongo.partyEvents());
  }
}