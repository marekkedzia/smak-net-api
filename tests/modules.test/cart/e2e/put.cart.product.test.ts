import { PutItemTestCase } from "../../../tests.schemas/test.cases/put.item.test.case";
import { Resource } from "../../../../src/utils/constants/resources.names";
import { Permission } from "../../../../src/auth/permission";
import { testPutItem } from "../../../tests.schemas/test.put.item";
import { cartRouter } from "../../../../src/context/cart.context";
import { Mongo } from "../../../../src/db/mongo";
import { CartState } from "../../../../src/modules/cart/cart.interfaces";

describe("test put cart product endpoint", () => {
    const cartId = "cartId";

    Mongo.carts = jest.fn().mockReturnValue({
      findOne: jest.fn().mockImplementation(({ id }) => {
        if (id === cartId)
          return Promise.resolve({ id, products: [] });

        return Promise.resolve(null);
      }),
      updateOne: jest.fn().mockImplementation(({ id }, { $set }) => {
        if (id === cartId && $set.state === CartState.ACTIVE)
          return { modifiedCount: 1 };

        return { modifiedCount: 0 };
      })
    });

    Mongo.products = jest.fn().mockReturnValue({
      findOne: jest.fn().mockImplementation(({ id }) => {
        if (id === "productId")
          return Promise.resolve({ value: { id: "productId" } });

        return null;
      })
    });


    const testCase: PutItemTestCase = {
      path: `/cart/${cartId}/product/productId`,
      resourceName: Resource.CART,
      requiredPermission: Permission.PUT_CART_PRODUCT,
      validBody: { count: 1 },
      invalidPath: `/cart/invalid-cart-id/product/productId`
    };

    testPutItem(testCase, cartRouter);
  }
);