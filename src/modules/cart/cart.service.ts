import { internalLocalStorage } from "../../config/internal.local.storage.config";
import { Cart, CartId, CartResponse, CartState } from "./cart.interfaces";
import { DateUtils } from "../../utils/date.utils";
import { CartRepository } from "./cart.repository";
import { logger } from "../../utils/logger";
import { IdUtils } from "../../utils/id.utils";
import { ResourceNotFoundError } from "../../errors/error.module";
import { Resource } from "../../utils/constants/resources.names";
import { mapCartToCartResponse } from "./cart.mapper";
import { ProductId } from "../product/product.interfaces";

export class CartService {
  constructor(private isProductAvailable: (productId: string) => Promise<boolean>) {
  }

  optionsCart = async (): Promise<CartId> => {
    const cart: Cart | null = await CartRepository.findActiveOneByOwnerId(internalLocalStorage.getUserId());
    let cartId: CartId;
    if (!cart)
      cartId = await this.createCart();
    else
      cartId = cart.id;

    logger.silly(`Cart options obtained for user: ${internalLocalStorage.getUserId()} and cart: ${cartId}.`);
    return cartId;
  };

  getCart = async (state: CartState): Promise<CartResponse> => {
    const cart: Cart | null = await CartRepository.findOneByOwnerIdAndState(internalLocalStorage.getUserId(), state);

    if (!cart)
      throw new ResourceNotFoundError(Resource.CART);

    logger.silly(`Cart obtained for user: ${internalLocalStorage.getUserId()} and cart: ${cart.id}.`);
    return mapCartToCartResponse(cart);
  };

  changeCartState = async (cartId: CartId, state: CartState): Promise<void> => {
    const cart: Cart | null = await CartRepository.findOneById(cartId);

    if (!cart)
      throw new ResourceNotFoundError(Resource.CART);

    cart.state = state;
    cart.modifiedAt = DateUtils.getDateNow();
    await CartRepository.updateCart(cart);
    logger.silly(`Cart state changed for user: ${cart.ownerId} and cart: ${cart.id}.`);
  };

  addProductToCart = async (cartId: CartId, productId: ProductId, count: number): Promise<void> => {
    const cart: Cart | null = await CartRepository.findOneById(cartId);

    if (!cart)
      throw new ResourceNotFoundError(Resource.CART);

    if (!await this.isProductAvailable(productId))
      throw new ResourceNotFoundError(Resource.PRODUCT);

    if (!cart.products.find(product => product.id === productId)) {
      cart.products.push({ id: productId, count });
    } else {
      cart.products = cart.products.map(product => {
        if (product.id === productId)
          product.count = count;
        return product;
      });
    }

    cart.modifiedAt = DateUtils.getDateNow();
    await CartRepository.updateCart(cart);
    logger.silly(`Product: ${productId} added to cart: ${cart.id}.`);
  };

  private createCart = async (): Promise<CartId> => {
    const cartId: CartId = IdUtils.provideCartId();
    const cart: Cart = {
      id: cartId,
      ownerId: internalLocalStorage.getUserId(),
      products: [],
      state: CartState.ACTIVE,
      modifiedAt: DateUtils.getDateNow(),
      createdAt: DateUtils.getDateNow()
    };

    await CartRepository.createCart(cart);
    logger.silly(`Cart created for user: ${cart.ownerId}.`);
    return cartId;
  };
}