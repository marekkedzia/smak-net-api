import { productRouter } from "../../../../src/context/product.context";
import { GetItemTestCase } from "../../../tests.schemas/test.cases/get.item.test.case";
import { Product, ProductId } from "../../../../src/modules/product/product.interfaces";
import { Permission } from "../../../../src/auth/permission";
import { Resource } from "../../../../src/utils/constants/resources.names";
import { OwnerId } from "../../../../src/utils/schemas/owner.id";
import { testGetItem } from "../../../tests.schemas/test.get.item";
import { DateUtils } from "../../../../src/utils/date.utils";
import { Mongo } from "../../../../src/db/mongo";
import { variablesConfig } from "../../../../src/config/variables.config";

describe("test get product endpoint", () => {
    const source: Product = {
      name: "product-name",
      description: "product-description",
      price: 1,
      category: variablesConfig.categories.FRUIT,
      createdAt: DateUtils.getDateNow(),
      ownerId: "owner-id" as OwnerId,
      id: "product-id" as ProductId
    };

    Mongo.products = jest.fn().mockImplementation(() => ({
      findOne: jest.fn().mockImplementation(({ id }) => id === source.id ? source : null)
    }));

    const testCase: GetItemTestCase<Product, Product> = {
      requiredPermission: Permission.GET_PRODUCT,
      source: source,
      expected: source,
      resourceName: Resource.PRODUCT
    };

    testGetItem(testCase, productRouter);
  }
);