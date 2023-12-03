import { GetItemTestCase } from "../../../tests.schemas/test.cases/get.item.test.case";
import { Cart, CartId, CartResponse, CartState } from "../../../../src/modules/cart/cart.interfaces";
import { testGetItem } from "../../../tests.schemas/test.get.item";
import { cartRouter } from "../../../../src/context/cart.context";
import { DUMMY_USER_ID, paths } from "../../../../src/config/variables.config";
import { Resource } from "../../../../src/utils/constants/resources.names";
import { Permission } from "../../../../src/auth/permission";
import { DateUtils } from "../../../../src/utils/date.utils";
import { Mongo } from "../../../../src/db/mongo";

describe("test get cart endpoint", () => {
    const source: Cart = {
      products: [],
      id: "cartId" as CartId,
      state: CartState.ACTIVE,
      modifiedAt: DateUtils.getDateNow(),
      ownerId: DUMMY_USER_ID,
      createdAt: DateUtils.getNowPlus(-DateUtils.DAY)
    };

    const expected: CartResponse = {
      products: [],
      id: "cartId" as CartId,
      state: CartState.ACTIVE,
      modifiedAt: DateUtils.getDateNow()
    };

    Mongo.carts = jest.fn().mockReturnValue({
      findOne: jest.fn().mockImplementation(({ ownerId }) => {
        if (ownerId === source.ownerId)
          return source;

        return null;
      })
    });

    const testCase: GetItemTestCase<Cart, CartResponse> = {
      path: `${paths.cart}?state=${CartState.ACTIVE}`,
      resourceName: Resource.CART,
      requiredPermission: Permission.GET_CART,
      source,
      expected,
      queryParameterKey: "state"
    };

    testGetItem(testCase, cartRouter);
  }
);