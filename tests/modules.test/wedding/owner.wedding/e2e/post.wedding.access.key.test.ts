import { PostItemTestCase } from "../../../../tests.schemas/test.cases/post.item.test.case";
import { Resource } from "../../../../../src/errors/error.datas";
import { RoutePermission } from "../../../../../src/auth/permission";
import { OwnerWeddingRouter } from "../../../../../src/modules/wedding/owner.wedding/owner.wedding.router";
import { OwnerWeddingService } from "../../../../../src/modules/wedding/owner.wedding/owner.wedding.service";
import { repositoryMock } from "../../../../mocks/repository.mock";
import { testPostItem } from "../../../../tests.schemas/test.post.item";
import { wedding1 } from "../../../../generators/weddings.generator";
import { Repository } from "../../../../../src/utils/schemas/repository";
import { Wedding } from "../../../../../src/modules/wedding/schemas/wedding";

describe("test owner post wedding access key handler", () => {
    const weddingRepositoryMock: Repository<Wedding> = {
      ...repositoryMock,
      findOne: jest.fn().mockResolvedValue(wedding1)
    };
    const testWeddingRouter = new OwnerWeddingRouter(new OwnerWeddingService(weddingRepositoryMock));

    const testCase: PostItemTestCase = {
      resourceName: Resource.EVENT,
      requiredPermission: RoutePermission.CREATE_WEDDING_ACCESS_KEY,
      validBody: {},
      path: `${testWeddingRouter.path}/${wedding1.id}/access-key`
    };

    testPostItem(testCase, testWeddingRouter);
  }
);