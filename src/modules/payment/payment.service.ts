import { ApiPaymentRequest, Payment, PaymentRequest, PaymentSessionId } from './payment.interfaces';
import { PaymentRepository } from "./payment.repository";
import { logger } from "../../utils/logger";
import { internalLocalStorage } from "../../config/internal.local.storage.config";
import { OrderId } from "../order/order.interfaces";
import { ResourceNotFoundError } from "../../errors/error.module";
import { Resource } from "../../utils/constants/resources.names";
import { IdUtils } from "../../utils/id.utils";
import { DateUtils } from "../../utils/date.utils";
import { UserId } from "../../utils/schemas/user.id";
import {LineItem} from './payment.interfaces';

export class PaymentService {

  constructor(
    private createPaymentSession: (apiPaymentRequest: ApiPaymentRequest) => Promise<PaymentSessionId>,
    private getOrderLineItems: (orderId: OrderId) => Promise<LineItem[] | null>
  ) {
  }

  public createOrderPayment = (paymentRequest: PaymentRequest): Promise<PaymentSessionId> =>
    this.createPayment(this.getOrderLineItems, Resource.ORDER)(paymentRequest);

  private createPayment = (getPaymentObject: (resourceId: string) => Promise<LineItem[] | null>, resourceType: Resource) =>
    async (paymentRequest: PaymentRequest): Promise<PaymentSessionId> => {
      const lineItems: LineItem[] | null = await getPaymentObject(paymentRequest.resourceId);

      if (!lineItems)
        throw new ResourceNotFoundError(resourceType);

      const sessionId: PaymentSessionId = await this.createPaymentSession({
        lineItems: lineItems,
        successUrl: paymentRequest.successUrl,
        cancelUrl: paymentRequest.cancelUrl
      });
      const userId: UserId = internalLocalStorage.getUserId();

      const payment: Payment = {
        id: IdUtils.providePaymentId(),
        ...paymentRequest,
        resourceType,
        lineItems,
        sessionId,
        ownerId: userId,
        createdAt: DateUtils.getDateNow()
      };

      await PaymentRepository.createPayment(payment);

      logger.info(`Payment created with key ${sessionId}, for user ${internalLocalStorage.getUserId()}, by request ${internalLocalStorage.getRequestId()}`);
      return sessionId;
    };
}