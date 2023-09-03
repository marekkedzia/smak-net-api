import { testGetItem } from "../../../../tests.schemas/test.get.item";
import { GuestWeddingCredentials, Wedding } from "../../../../../src/modules/wedding/schemas/wedding";
import { GetItemTestCase } from "../../../../tests.schemas/test.cases/get.item.test.case";
import { Resource } from "../../../../../src/errors/error.datas";
import { RoutePermission } from "../../../../../src/auth/permission";
import { repositoryMock } from "../../../../mocks/repository.mock";
import { GuestWeddingService } from "../../../../../src/modules/wedding/guest.wedding/guest.wedding.service";
import { GuestWeddingRouter } from "../../../../../src/modules/wedding/guest.wedding/guest.wedding.router";
import { wedding1 } from "../../../../generators/weddings.generator";
import { Repository } from "../../../../../src/utils/schemas/repository";
import { PartyEvent } from "../../../../../src/modules/party.event/schemas/party.event";

describe("test owner get wedding by access key handler", () => {
  const weddingRepositoryMock: Repository<Wedding> = {
    ...repositoryMock,
    findOne: jest.fn().mockImplementation((query): PartyEvent | null =>
         query['credentials.accessKey'] === wedding1.credentials.accessKey ? wedding1 : null
    )
  };
  const testWeddingRouter = new GuestWeddingRouter(new GuestWeddingService(weddingRepositoryMock));

  const testCase: GetItemTestCase<Wedding, GuestWeddingCredentials> = {
    resourceName: Resource.EVENT,
    requiredPermission: RoutePermission.GET_WEDDING_GUEST_CREDENTIALS,
    path: `${testWeddingRouter.path}/${wedding1.credentials.accessKey}`,
    source: wedding1,
    expected: {
      id: wedding1.id,
      credentials: wedding1.credentials,
      createdAt: wedding1.createdAt,
      state: wedding1.state
    }
  };

  testGetItem(testCase, testWeddingRouter);
});