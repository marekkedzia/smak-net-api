import { ApiPaymentRequest, Payment, PaymentObject, PaymentRequest, PaymentSessionId } from './payment.interfaces';
import { PaymentRepository } from "./payment.repository";
import { logger } from "../../utils/logger";
import { internalLocalStorage } from "../../config/internal.local.storage.config";
import { OrderId } from "../order/order.interfaces";
import { ResourceNotFoundError } from "../../errors/error.module";
import { Resource } from "../../utils/constants/resources.names";
import { IdUtils } from "../../utils/id.utils";
import { DateUtils } from "../../utils/date.utils";
import { UserId } from "../../utils/schemas/user.id";

export class PaymentService {

  constructor(
    private createPaymentSession: (apiPaymentRequest: ApiPaymentRequest) => Promise<PaymentSessionId>,
    private getOrderPaymentObject: (orderId: OrderId) => Promise<PaymentObject | null>
  ) {
  }

  public createOrderPayment = (paymentRequest: PaymentRequest): Promise<PaymentSessionId> =>
    this.createPayment(this.getOrderPaymentObject, Resource.ORDER)(paymentRequest);

  private createPayment = (getPaymentObject: (resourceId: string) => Promise<PaymentObject | null>, resourceType: Resource) =>
    async (paymentRequest: PaymentRequest): Promise<PaymentSessionId> => {
      const paymentObject: PaymentObject | null = await getPaymentObject(paymentRequest.resourceId);

      if (!paymentObject)
        throw new ResourceNotFoundError(resourceType);

      const sessionId: PaymentSessionId = await this.createPaymentSession({ amount: paymentObject.amount });
      const userId: UserId = internalLocalStorage.getUserId();

      const payment: Payment = {
        id: IdUtils.providePaymentId(),
        ...paymentRequest,
        resourceType,
        ...paymentObject,
        sessionId,
        ownerId: userId,
        createdAt: DateUtils.getDateNow()
      };

      await PaymentRepository.createPayment(payment);

      logger.info(`Payment session created with key ${sessionId}, for user ${internalLocalStorage.getUserId()}, by request ${internalLocalStorage.getRequestId()}`);
      return sessionId;
    };
}