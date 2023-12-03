import { PutItemTestCase } from "../../../tests.schemas/test.cases/put.item.test.case";
import { Resource } from "../../../../src/utils/constants/resources.names";
import { Permission } from "../../../../src/auth/permission";
import { CartState } from "../../../../src/modules/cart/cart.interfaces";
import { cartRouter } from "../../../../src/context/cart.context";
import { testPutItem } from "../../../tests.schemas/test.put.item";
import { Mongo } from "../../../../src/db/mongo";

describe("test put cart state endpoint", () => {
    const cartId = "cartId";

    Mongo.carts = jest.fn().mockReturnValue({
      findOne: jest.fn().mockImplementation(({ id }) => {
        if (id === cartId)
          return { value: { id } };

        return null;
      }),
      updateOne: jest.fn().mockImplementation(({ id }, { $set }) => {
        if (id === cartId && $set.state === CartState.ACTIVE)
          return { modifiedCount: 1 };

        return { modifiedCount: 0 };
      })
    });

    const testCase: PutItemTestCase = {
      path: `/cart/${cartId}/state`,
      resourceName: Resource.CART,
      requiredPermission: Permission.PUT_CART_STATE,
      validBody: { state: CartState.ACTIVE },
      invalidPath: `/cart/invalid-cart-id/state`
    };

    testPutItem(testCase, cartRouter);
  }
);