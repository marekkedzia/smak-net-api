import { InternalRouter } from "../../utils/schemas/router";
import { OperationId, Post, Route, Security } from "tsoa";
import { paths } from "../../config/variables.config";
import { HTTP_STATUS } from "../../utils/constants/http.statuses";
import { ParameterizedContext } from "koa";
import { OrderService } from "./order.service";
import { OrderId, OrderRequest } from "./order.interfaces";


@Route("/order")
export class OrderRouter extends InternalRouter {
  constructor(private orderService: OrderService) {
    super(paths.order);

    this.router.post(`${paths.cart}/:cartId`,
      (ctx: ParameterizedContext) =>
        this.createCartOrder(ctx.params.cartId).then(async (): Promise<void> => {
            ctx.status = HTTP_STATUS.CREATED;
          }
        )
    );
  }

  /**
   * Create order for cart
   */
  @OperationId("create order for cart")
  @Security("jwt", ["user"])
  @Post("/cart/{cartId}")
  createCartOrder(orderRequest: OrderRequest): Promise<OrderId> {
    return this.orderService.createCartOrder(orderRequest);
  }
}