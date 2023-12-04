import { PostItemTestCase } from "../../../tests.schemas/test.cases/post.item.test.case";
import { paths } from "../../../../src/config/variables.config";
import { Resource } from "../../../../src/utils/constants/resources.names";
import { Permission } from "../../../../src/auth/permission";
import { PaymentRequest } from "../../../../src/modules/payment/payment.interfaces";
import { testPostItem } from "../../../tests.schemas/test.post.item";
import { paymentRouter } from "../../../../src/context/payment.context";
import { Mongo } from "../../../../src/db/mongo";

describe("test post order payment endpoint", () => {
    const orderId = "orderId";
    const validBody: PaymentRequest = {
      resourceId: orderId
    };

    Mongo.orders = jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue({
        id: orderId,
        amount: 100,
        currency: "EUR"
      })
    });

    Mongo.payments = jest.fn().mockReturnValue({
      insertOne: jest.fn()
    });

    const testCase: PostItemTestCase = {
      path: `${paths.payment}${paths.order}/${orderId}`,
      resourceName: Resource.ORDER,
      requiredPermission: Permission.CREATE_ORDER_PAYMENT,
      validBody
    };

    testPostItem(testCase, paymentRouter);
  }
);