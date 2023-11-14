import { PostItemTestCase } from "../../../tests.schemas/test.cases/post.item.test.case";
import { Permission } from "../../../../src/auth/permission";
import { ProductRequest } from "../../../../src/modules/product/product.interfaces";
import { Resource } from "../../../../src/utils/constants/resources.names";
import { testPostItem } from "../../../tests.schemas/test.post.item";
import { productRouter } from "../../../../src/context/product.context";
import { Mongo } from "../../../../src/db/mongo";

describe("test post product endpoint", () => {
    const validBody: ProductRequest = {
      name: "product-name",
      description: "product-description",
      price: 1
    };

    const testCase: PostItemTestCase = {
      requiredPermission: Permission.CREATE_PRODUCT,
      validBody: validBody,
      resourceName: Resource.PRODUCT
    };

    Mongo.products = jest.fn().mockImplementation(() => ({
      insertOne: jest.fn()
    }));

    testPostItem(testCase, productRouter);
  }
);