import { Order, OrderId, OrderRequest } from "./order.interfaces";
import { IdUtils } from "../../utils/id.utils";
import { DateUtils } from "../../utils/date.utils";
import { OrderRepository } from "./order.repository";
import { logger } from "../../utils/logger";
import { internalLocalStorage } from "../../config/internal.local.storage.config";
import { UserId } from "../../utils/schemas/user.id";
import { CartId } from "../cart/cart.interfaces";

export class OrderService {
  constructor(private findCartAmountAndCurrency: (cartId: CartId) => Promise<{ price: number, currency: string }>
  ) {
  }

  createCartOrder = (orderRequest: OrderRequest) => this.createOrder(this.findCartAmountAndCurrency)(orderRequest);

  private createOrder = (findAmountAndCurrency: (resourceId: string) => Promise<{ price: number, currency: string }>) =>
    async (orderRequest: OrderRequest): Promise<OrderId> => {
      const { price, currency } = await findAmountAndCurrency(orderRequest.resourceId);
      const userId: UserId = internalLocalStorage.getUserId();
      const order: Order = {
        id: IdUtils.provideOrderId(),
        ...orderRequest,
        createdAt: DateUtils.getDateNow(),
        ownerId: userId,
        amount: price,
        currency: currency
      };

      await OrderRepository.createOrder(order);
      logger.silly(`Order ${order.id} created for user, for user ${userId} by request ${internalLocalStorage.getRequestId()}`);
      return order.id;
    };
}