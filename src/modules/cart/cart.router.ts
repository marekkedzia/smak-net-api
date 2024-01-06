import { InternalRouter } from "../../utils/schemas/router";
import { Delete, Get, OperationId, Path, Put, Query, Route, Security } from "tsoa";
import { paths } from "../../config/variables.config";
import { CartId, CartResponse, CartState } from "./cart.interfaces";
import { CartService } from "./cart.service";
import { mapStringToCartState } from "./cart.mapper";
import { HTTP_STATUS } from "../../utils/constants/http.statuses";
import { ParameterizedContext } from "koa";
import { validateBody, validateQuery } from "../../utils/validator";
import { cartProductValidator, cartStateValidator, validateStateTransition } from "./cart.validator";
import { ProductId } from "../product/product.interfaces";

@Route("/cart")
export class CartRouter extends InternalRouter {

  constructor(private cartService: CartService) {
    super(paths.cart);

    this.router.get("/", validateQuery(cartStateValidator), (ctx: ParameterizedContext) =>
      this.getCart(mapStringToCartState(ctx.query.state as string))
        .then((cart: CartResponse) => {
          ctx.body = cart;
          ctx.status = HTTP_STATUS.OK;
        }));

    this.router.put("/:cartId/state", validateBody(cartStateValidator), validateStateTransition, (ctx: ParameterizedContext) =>
      this.changeCartState(ctx.params.cartId, mapStringToCartState(ctx.request.body.state))
        .then(() => {
          ctx.status = HTTP_STATUS.NO_CONTENT;
        }));

    this.router.put("/:cartId/product/:productId", validateBody(cartProductValidator), (ctx: ParameterizedContext) =>
      this.addProductToCart(ctx.params.cartId, ctx.params.productId, ctx.request.body.count)
        .then(() => {
          ctx.status = HTTP_STATUS.NO_CONTENT;
        }));

    this.router.delete("/:cartId/product/:productId", (ctx: ParameterizedContext) =>
      this.removeProductFromCart(ctx.params.cartId, ctx.params.productId)
        .then(() => {
          ctx.status = HTTP_STATUS.NO_CONTENT;
        }));
  }

  /*
   * Get active cart
   */
  @OperationId("get active cart")
  @Security("jwt", ["user"])
  @Get("/cart")
  getCart(@Query() state: CartState): Promise<CartResponse> {
    return this.cartService.getCart(state);
  }

  /*
    * Change cart state
   */
  @OperationId("change cart state")
  @Security("jwt", ["user"])
  @Put("/cart/{cartId}/state")
  changeCartState(@Path() cartId: string, @Query() state: CartState): Promise<void> {
    return this.cartService.changeCartState(cartId as CartId, state);
  }

  /*
    * Add product to cart
   */
  @OperationId("add product to cart")
  @Security("jwt", ["user"])
  @Put("/cart/{cartId}/product/{productId}")
  addProductToCart(@Path() cartId: string, @Path() productId: string, @Query() count: number): Promise<void> {
    return this.cartService.addProductToCart(cartId as CartId, productId as ProductId, count);
  }

  /*
    * Remove product from cart
   */
  @OperationId("remove product from cart")
  @Security("jwt", ["user"])
  @Delete("/cart/{cartId}/product/{productId}")
  removeProductFromCart(@Path() cartId: string, @Path() productId: string): Promise<void> {
    return this.cartService.removeProductFromCart(cartId as CartId, productId as ProductId);
  }
}