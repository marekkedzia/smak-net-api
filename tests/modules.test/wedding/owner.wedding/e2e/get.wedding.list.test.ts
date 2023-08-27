import { wedding1, wedding2, wedding3 } from "../../../../generators/weddings.generator";
import { Wedding, WeddingListElement } from "../../../../../src/modules/wedding/schemas/wedding";
import { repositoryMock } from "../../../../mocks/repository.mock";
import { testGetItemList } from "../../../../tests.schemas/test.get.items.list";
import { Resource } from "../../../../../src/errors/error.datas";
import { Permission } from "../../../../../src/auth/permission";
import { GetItemTestCase } from "../../../../tests.schemas/test.cases/get.item.test.case";
import { mapWeddingToListElement } from "../../../../../src/modules/wedding/wedding.mappers";
import { OwnerWeddingRouter } from "../../../../../src/modules/wedding/owner.wedding/owner.wedding.router";
import { OwnerWeddingService } from "../../../../../src/modules/wedding/owner.wedding/owner.wedding.service";
import { testPermissionAccess } from "../../../../tests.schemas/test.permission.access";
import { WeddingRepository } from "../../../../../src/modules/wedding/wedding.repository";

describe("test owner get wedding list handler", () => {
    const testGetWeddingListEndpoint = (weddings: Wedding[]) => {
      const weddingRepository = {
        ...repositoryMock,
        findMany: async () => weddings
      };

      const testCase: GetItemTestCase<Wedding[], WeddingListElement[]> = {
        resourceName: Resource.EVENT,
        requiredPermission: Permission.GET_WEDDING,
        source: weddings,
        expected: weddings.map(mapWeddingToListElement)
      };

      const testWeddingRouter = new OwnerWeddingRouter(new OwnerWeddingService(weddingRepository));
      testGetItemList(testCase, testWeddingRouter);
    };

    testGetWeddingListEndpoint([wedding1, wedding2, wedding3]);
    testGetWeddingListEndpoint([wedding1]);
    testGetWeddingListEndpoint([]);
  }
);