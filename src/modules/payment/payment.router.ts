import { InternalRouter } from "../../utils/schemas/router";
import { OperationId, Post, Route, Security } from "tsoa";
import { paths } from "../../config/variables.config";
import { HTTP_STATUS } from "../../utils/constants/http.statuses";
import { ParameterizedContext } from "koa";
import { PaymentService } from "./payment.service";
import { PaymentRequest, PaymentSessionId } from './payment.interfaces';

@Route("/payment")
export class PaymentRouter extends InternalRouter {
  constructor(private paymentService: PaymentService) {
    super(paths.payment);

    this.router.post(`${paths.order}/:orderId`,
      (ctx: ParameterizedContext) =>
        this.createOrderPayment({ resourceId: ctx.params.orderId, successUrl: ctx.request.body.successUrl, cancelUrl: ctx.request.body.cancelUrl })
          .then(async (sessionId: PaymentSessionId): Promise<void> => {
          ctx.status = HTTP_STATUS.CREATED;
          ctx.body = { sessionId };
        })
    );
  }

  /**
   * Create payment for order
   */
  @OperationId("create payment for order")
  @Security("jwt", ["user"])
  @Post("/order/{orderId}")
  createOrderPayment(payment: PaymentRequest): Promise<PaymentSessionId> {
    return this.paymentService.createOrderPayment(payment);
  }
}