import { Resource } from "../../../../src/utils/constants/resources.names";
import { DeleteItemTestCase } from "../../../tests.schemas/test.cases/delete.item.test.case";
import { Permission } from "../../../../src/auth/permission";
import { cartRouter } from "../../../../src/context/cart.context";
import { testDeleteItem } from "../../../tests.schemas/test.delete.item";
import { Mongo } from "../../../../src/db/mongo";

describe("test delete cart product endpoint", () => {
    const cartId = "cartId";
    const productId = "productId";

    Mongo.carts = jest.fn().mockReturnValue({
      findOne: jest.fn().mockImplementation(({ id }) => {
        if (id === cartId)
          return { products: [{ id: productId }] };

        return null;
      }),
      updateOne: jest.fn().mockImplementation(({ id }) => {
        if (id === cartId)
          return { products: [] };

        return null;
      })
    });

    const testCase: DeleteItemTestCase = {
      path: `/cart/${cartId}/product/${productId}`,
      resourceName: Resource.CART,
      requiredPermission: Permission.DELETE_CART_PRODUCT,
      invalidPath: `/cart/invalid/product/${productId}`
    };

    testDeleteItem(testCase, cartRouter);
  }
);