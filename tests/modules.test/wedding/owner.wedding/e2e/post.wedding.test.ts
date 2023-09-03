import { testPostItem } from "../../../../tests.schemas/test.post.item";
import { WeddingName } from "../../../../../src/modules/wedding/schemas/wedding";
import { DateUtils } from "../../../../../src/utils/date.utils";
import { Resource } from "../../../../../src/errors/error.datas";
import { RoutePermission } from "../../../../../src/auth/permission";
import { PostItemTestCase } from "../../../../tests.schemas/test.cases/post.item.test.case";
import { OwnerWeddingService } from "../../../../../src/modules/wedding/owner.wedding/owner.wedding.service";
import { OwnerWeddingRouter } from "../../../../../src/modules/wedding/owner.wedding/owner.wedding.router";
import { repositoryMock } from "../../../../mocks/repository.mock";

describe("test owner post wedding handler", () => {
    const testCase: PostItemTestCase = {
      resourceName: Resource.EVENT,
      requiredPermission: RoutePermission.CREATE_WEDDING,
      validBody: {
        name: "Justyna&Filip" as WeddingName,
        date: DateUtils.getNowPlusWeek()
      }
    };
    const testWeddingRouter = new OwnerWeddingRouter(new OwnerWeddingService(repositoryMock));

    testPostItem(testCase, testWeddingRouter);
  }
);