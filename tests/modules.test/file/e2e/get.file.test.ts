import { GetItemTestCase } from "../../../tests.schemas/test.cases/get.item.test.case";
import { Permission } from "../../../../src/auth/permission";
import { Resource } from "../../../../src/utils/constants/resources.names";
import { testGetItem } from "../../../tests.schemas/test.get.item";
import { Mongo } from "../../../../src/db/mongo";
import { FileService } from "../../../../src/modules/file/file.service";
import { FileRouter } from "../../../../src/modules/file/file.router";

describe("test get file endpoint", () => {
    const fileId = "some-file-id";
    const fileService = new FileService(jest.fn(), jest.fn().mockResolvedValue({}));
    const fileRouter = new FileRouter(fileService);

    Mongo.files = jest.fn().mockImplementation(() => ({
        findOne: jest.fn().mockImplementation((query) => {
            if (query.id === fileId)
              return Promise.resolve({ id: "some-file-id", key: "some-file-key" });
            return Promise.resolve(null);
          }
        )
      }
    ));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testCase: GetItemTestCase<any, any> = {
      path: `/file/${fileId}`,
      requiredPermission: Permission.CREATE_PRODUCT_IMAGE,
      resourceName: Resource.FILE,
      expected: {},
      source: {}
    };

    testGetItem(testCase, fileRouter);
  }
);