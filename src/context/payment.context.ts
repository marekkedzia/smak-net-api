import { PaymentService } from "../modules/payment/payment.service";
import { PaymentRouter } from "../modules/payment/payment.router";
import { Order, OrderId } from "../modules/order/order.interfaces";
import { PaymentObject } from "../modules/payment/payment.interfaces";
import { OrderRepository } from "../modules/order/order.repository";
import { StripeClient } from "../api/stripe/stripe.client";

const findOrderPaymentObject = (orderId: OrderId) =>
  OrderRepository.getOrderById(orderId).then((order: Order | null): PaymentObject | null =>
    order ?
      ({
        amount: order.amount,
        currency: order.currency
      }) :
      null
  );

const paymentService = new PaymentService(new StripeClient().createPaymentSession, findOrderPaymentObject);
export const paymentRouter = new PaymentRouter(paymentService);