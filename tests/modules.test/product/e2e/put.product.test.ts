import { PutItemTestCase } from "../../../tests.schemas/test.cases/put.item.test.case";
import { Resource } from "../../../../src/utils/constants/resources.names";
import { Permission } from "../../../../src/auth/permission";
import { testPutItem } from "../../../tests.schemas/test.put.item";
import { productRouter } from "../../../../src/context/product.context";
import { Mongo } from "../../../../src/db/mongo";
import { variablesConfig } from "../../../../src/config/variables.config";

describe("test put product endpoint", () => {
    const productId = "product-id";
    const validBody = {
      name: "product-name",
      description: "product-description",
      category: variablesConfig.categories.BREAD,
      price: 1
    };

    Mongo.products = jest.fn().mockImplementation(() => ({
      updateOne: jest.fn().mockImplementation((query) => {
          if (query.id === productId)
            return Promise.resolve({ modifiedCount: 1 });

          return Promise.resolve({ modifiedCount: 0 });
        }
      )
    }));


    const testCase: PutItemTestCase = {
      path: `/product/${productId}`,
      resourceName: Resource.PRODUCT,
      requiredPermission: Permission.PUT_PRODUCT,
      validBody
    };

    testPutItem(testCase, productRouter);
  }
);