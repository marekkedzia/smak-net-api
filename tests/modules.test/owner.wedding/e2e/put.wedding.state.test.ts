import { PutItemTestCase } from "../../../tests.schemas/test.cases/put.item.test.case";
import { Resource } from "../../../../src/errors/error.datas";
import { Permission } from "../../../../src/auth/permission";
import { testPutItem } from "../../../tests.schemas/test.put.item";
import { OwnerWeddingRouter } from "../../../../src/modules/wedding/owner.wedding/owner.wedding.router";
import { OwnerWeddingService } from "../../../../src/modules/wedding/owner.wedding/owner.wedding.service";
import { repositoryMock } from "../../../mocks/repository.mock";
import { wedding1 } from "../../../generators/weddings.generator";

describe("test owner put state wedding handler", () => {
  const weddingRepositoryMock = {
    ...repositoryMock,
    findOne: jest.fn().mockResolvedValue(wedding1)
  };
  const testWeddingRouter = new OwnerWeddingRouter(new OwnerWeddingService(weddingRepositoryMock));

  const testCase: PutItemTestCase = {
    path: `${testWeddingRouter.path}/${wedding1.id}/closed-state`,
    resourceName: Resource.EVENT,
    requiredPermission: Permission.UPDATE_WEDDING,
    validBody: {}
  };

  testPutItem(testCase, testWeddingRouter);
});