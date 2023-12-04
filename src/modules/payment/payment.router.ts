import { InternalRouter } from "../../utils/schemas/router";
import { OperationId, Post, Route, Security } from "tsoa";
import { paths } from "../../config/variables.config";
import { HTTP_STATUS } from "../../utils/constants/http.statuses";
import { ParameterizedContext } from "koa";
import { PaymentService } from "./payment.service";
import { PaymentKey, PaymentRequest } from "./payment.interfaces";
import { validateBody } from "../../utils/validator";
import { paymentRequestValidator } from "./payment.validator";

@Route("/payment")
export class PaymentRouter extends InternalRouter {
  constructor(private paymentService: PaymentService) {
    super(paths.payment);

    this.router.post(`${paths.order}/:orderId`,
      validateBody(paymentRequestValidator),
      (ctx: ParameterizedContext) =>
        this.createOrderPayment(ctx.request.body).then(async (paymentKey: PaymentKey): Promise<void> => {
          ctx.status = HTTP_STATUS.CREATED;
          ctx.body = { paymentKey };
        })
    );
  }

  /**
   * Create payment for order
   */
  @OperationId("create payment for order")
  @Security("jwt", ["user"])
  @Post("/order/{orderId}")
  createOrderPayment(payment: PaymentRequest): Promise<PaymentKey> {
    return this.paymentService.createOrderPayment(payment);
  }
}