import { testGetItem } from "../../../tests.schemas/test.get.item";
import { GetItemTestCase } from "../../../tests.schemas/get.item.test.case";
import { Wedding, WeddingId, WeddingName } from "../../../../src/modules/wedding/schemas/wedding";
import { Resource } from "../../../../src/errors/error.datas";
import { Permissions } from "../../../../src/auth/permissions";
import { DateService } from "../../../../src/services/date.service";
import { PartyEventState } from "../../../../src/modules/party.event/schemas/party.event.states";
import { UserId } from "../../../../src/utils/schemas/user.id";
import { OwnerWeddingRouter } from "../../../../src/modules/wedding/owner.wedding/owner.wedding.router";
import { OwnerWeddingService } from "../../../../src/modules/wedding/owner.wedding/owner.wedding.service";
import { repositoryMock } from "../../../mocks/repository.mock";
import { Repository } from "../../../../src/utils/schemas/repository";

describe("test event owner.wedding handler", () => {
    const wedding: Wedding = {
      id: "wedding_id" as WeddingId,
      credentials: {
        name: "Justyna&Filip" as WeddingName
      },
      createdAt: DateService.getDateNow(),
      state: PartyEventState.OPEN,
      ownerId: "owner_id" as UserId
    };

    const getWeddingTestCase: GetItemTestCase<Wedding, Wedding> = {
      resourceName: Resource.EVENT,
      requiredPermission: Permissions.GET_WEDDING,
      source: wedding,
      expected: wedding
    };

    const repository: Repository<Wedding> = {
      ...repositoryMock,
      findOne: async ({ id }) => id === wedding.id ? wedding : null
    };

    const testWeddingRouter = new OwnerWeddingRouter(new OwnerWeddingService(repository));

    testGetItem(getWeddingTestCase, testWeddingRouter);
  }
);