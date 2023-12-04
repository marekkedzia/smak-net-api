import { OrderService } from "../modules/order/order.service";
import { OrderRouter } from "../modules/order/order.router";
import { CartRepository } from "../modules/cart/cart.repository";
import { ResourceNotFoundError } from "../errors/error.module";
import { Resource } from "../utils/constants/resources.names";
import { variablesConfig } from "../config/variables.config";
import { ProductRepository } from "../modules/product/product.repository";
import { CartId } from "../modules/cart/cart.interfaces";

const findCartAmountAndCurrency = async (cartId: CartId): Promise<{ price: number, currency: string }> => {
  const cart = await CartRepository.findOneById(cartId);
  if (!cart) {
    throw new ResourceNotFoundError(Resource.CART);
  }

  let amount = 0;
  for (const product of cart.products) {
    const productData = await ProductRepository.findOne(product.id);
    if (!productData || !productData.price) {
      throw new ResourceNotFoundError(Resource.PRODUCT);
    }
    amount += productData.price;
  }

  return { price: amount, currency: variablesConfig.handledCurrencies.PLN };
};


const orderService = new OrderService(findCartAmountAndCurrency);
export const orderRouter = new OrderRouter(orderService);