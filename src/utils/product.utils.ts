import { Product } from '../modules/product/product.interfaces';
import { LineItem } from '../modules/payment/payment.interfaces';
import { variablesConfig } from '../config/variables.config';
import { OrderCartItem } from '../modules/order/order.interfaces';
import { ProductRepository } from '../modules/product/product.repository';
import { ResourceNotFoundError } from '../errors/error.module';

export const getLineItemForCartItem = async (cartItem: OrderCartItem): Promise<LineItem> => {
  const product = await ProductRepository.findOne(cartItem.id);
  if(!product) throw new ResourceNotFoundError();

  return createLineItemFromProduct(product, cartItem.count);
};

export const createLineItemFromProduct = (product: Product, count: number): LineItem => ({
  price_data: {
    currency: variablesConfig.handledCurrencies.PLN,
    product_data: {
      name: product.name,
    },
    unit_amount: product.price,
  },
  quantity: count,
});