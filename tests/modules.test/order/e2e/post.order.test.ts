import { PostItemTestCase } from "../../../tests.schemas/test.cases/post.item.test.case";
import { testPostItem } from "../../../tests.schemas/test.post.item";
import { paths } from "../../../../src/config/variables.config";
import { Permission } from "../../../../src/auth/permission";
import { Resource } from "../../../../src/utils/constants/resources.names";
import { Mongo } from "../../../../src/db/mongo";
import { orderRouter } from "../../../../src/context/order.context";

describe("test post order payment endpoint", () => {
    const cartId = "cartId";

    Mongo.products = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue({
        id: "someId",
        price: 100
      })
    });

    Mongo.carts = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue({
        id: "someId",
        products: [
          {
            id: "someId",
            amount: 1
          }
        ]
      })
    });

    Mongo.orders = jest.fn().mockReturnValue({
        insertOne: jest.fn(),
        findOne: jest.fn().mockResolvedValue({
          id: "someId",
          amount: 100,
          currency: "EUR"
        })
      }
    );

    const testCase: PostItemTestCase = {
      path: `${paths.order}${paths.cart}/${cartId}`,
      requiredPermission: Permission.CREATE_CART_ORDER,
      resourceName: Resource.ORDER,
      validBody: {}
    };

    testPostItem(testCase, orderRouter);
  }
);