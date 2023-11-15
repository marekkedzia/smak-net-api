import { Resource } from "../../../../src/utils/constants/resources.names";
import { DeleteItemTestCase } from "../../../tests.schemas/test.cases/delete.item.test.case";
import { testDeleteItem } from "../../../tests.schemas/test.delete.item";
import { productRouter } from "../../../../src/context/product.context";
import { Permission } from "../../../../src/auth/permission";
import { Mongo } from "../../../../src/db/mongo";

describe("test delete product endpoint", () => {
    const testProductId = "product-id";

    Mongo.products = jest.fn().mockImplementation(() => ({
      deleteOne: jest.fn().mockImplementation((query) => {
          if (query.id === testProductId)
            return Promise.resolve({ deletedCount: 1 });

          return Promise.resolve({ deletedCount: 0 });
        }
      )
    }));

    const testCase: DeleteItemTestCase = {
      resourceName: Resource.PRODUCT,
      requiredPermission: Permission.DELETE_PRODUCT,
      path: `/product/${testProductId}`
    };

    testDeleteItem(testCase, productRouter);
  }
);