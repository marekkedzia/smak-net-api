import { testGetItem } from "../../../../tests.schemas/test.get.item";
import { GetItemTestCase } from "../../../../tests.schemas/test.cases/get.item.test.case";
import { Wedding } from "../../../../../src/modules/wedding/schemas/wedding";
import { Resource } from "../../../../../src/errors/error.datas";
import { RoutePermission } from "../../../../../src/auth/permission";
import { OwnerWeddingRouter } from "../../../../../src/modules/wedding/owner.wedding/owner.wedding.router";
import { OwnerWeddingService } from "../../../../../src/modules/wedding/owner.wedding/owner.wedding.service";
import { repositoryMock } from "../../../../mocks/repository.mock";
import { Repository } from "../../../../../src/utils/schemas/repository";
import { wedding1 } from "../../../../generators/weddings.generator";

describe("test owner get wedding handler", () => {
    const wedding: Wedding = wedding1;

    const getWeddingTestCase: GetItemTestCase<Wedding, Wedding> = {
      resourceName: Resource.EVENT,
      requiredPermission: RoutePermission.GET_WEDDING,
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