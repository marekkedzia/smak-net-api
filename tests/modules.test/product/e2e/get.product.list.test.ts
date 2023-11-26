import { Product, ProductId } from "../../../../src/modules/product/product.interfaces";
import { GetItemTestCase } from "../../../tests.schemas/test.cases/get.item.test.case";
import { UserId } from "../../../../src/utils/schemas/user.id";
import { DateUtils } from "../../../../src/utils/date.utils";
import { Resource } from "../../../../src/utils/constants/resources.names";
import { Permission } from "../../../../src/auth/permission";
import { productRouter } from "../../../../src/context/product.context";
import { testGetItemList } from "../../../tests.schemas/test.get.items.list";
import { Mongo } from "../../../../src/db/mongo";
import { CATEGORY } from "../../../../src/config/variables.config";

describe("test get product list endpoint", () => {
    const source: Product[] = [
      {
        id: "product-id" as ProductId,
        name: "product-name",
        description: "product-description",
        price: 1,
        category: CATEGORY.FRUIT,
        createdAt: DateUtils.getDateNow(),
        ownerId: "owner-id" as UserId
      }
    ];

    Mongo.products = jest.fn().mockImplementation(() => ({
      find: jest.fn().mockImplementation(() => ({
        toArray: jest.fn().mockResolvedValue(source)
      }))
    }));

    const testCase: GetItemTestCase<Product[], Product[]> = {
      source,
      expected: source,
      resourceName: Resource.PRODUCT,
      requiredPermission: Permission.GET_PRODUCT
    };

    testGetItemList(testCase, productRouter);
  }
);