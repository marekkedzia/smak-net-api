import { PaymentService } from "../modules/payment/payment.service";
import { PaymentRouter } from "../modules/payment/payment.router";
import { OrderCartItem, OrderId } from '../modules/order/order.interfaces';
import { OrderRepository } from "../modules/order/order.repository";
import { StripeClient } from "../api/stripe/stripe.client";
import { LineItem } from '../modules/payment/payment.interfaces';
import { CartRepository } from '../modules/cart/cart.repository';
import { getLineItemForCartItem } from '../utils/product.utils';
import { Order } from '../modules/order/order.interfaces';
import { Cart } from '../modules/cart/cart.interfaces';
import { ResourceNotFoundError } from '../errors/error.module';

const findOrderLineItems = async (orderId: OrderId): Promise<LineItem[] | null> => {
  const order: Order | null = await OrderRepository.getOrderById(orderId);
  if (!order) throw new ResourceNotFoundError();

  const cart: Cart | null = await CartRepository.findOneById(order.resourceId);
  if (!cart || !cart.products) throw new ResourceNotFoundError();

  const lineItemsPromises = cart.products.map((cartItem: OrderCartItem) => getLineItemForCartItem(cartItem));
  return Promise.all(lineItemsPromises);
};

const paymentService = new PaymentService(new StripeClient().createPaymentSession, findOrderLineItems);
export const paymentRouter = new PaymentRouter(paymentService);