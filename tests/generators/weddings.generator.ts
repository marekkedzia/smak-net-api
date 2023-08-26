import { Wedding, WeddingId, WeddingName } from "../../src/modules/wedding/schemas/wedding";
import { PartyEventState } from "../../src/modules/party.event/schemas/party.event.states";
import { UserId } from "../../src/utils/schemas/user.id";

export const wedding1: Wedding = {
  id: "wedding1" as WeddingId,
  createdAt: 1111,
  credentials: {
    name: "Karolina&Marek" as WeddingName
  },
  state: PartyEventState.OPEN,
  ownerId: "owner1" as UserId
};

export const wedding2: Wedding = {
  id: "wedding2" as WeddingId,
  createdAt: 2222,
  credentials: {
    name: "Justyna&Filip" as WeddingName
  },
  state: PartyEventState.OPEN,
  ownerId: "owner2" as UserId
};

export const wedding3: Wedding = {
  id: "wedding3" as WeddingId,
  createdAt: 3333,
  credentials: {
    name: "Ania&Kamil" as WeddingName
  },
  state: PartyEventState.OPEN,
  ownerId: "owner3" as UserId
};

export const weddings: Wedding[] = [wedding1, wedding2, wedding3];
