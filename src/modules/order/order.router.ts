import { InternalRouter } from "../../utils/schemas/router";
import { Get, OperationId, Post, Route, Security } from "tsoa";
import { paths } from "../../config/variables.config";
import { HTTP_STATUS } from "../../utils/constants/http.statuses";
import { ParameterizedContext } from "koa";
import { OrderService } from "./order.service";
import { Order, OrderId, OrderRequest } from "./order.interfaces";
import { validateBody } from "../../utils/validator";
import { createOrderValidator } from "./order.validator";


@Route("/order")
export class OrderRouter extends InternalRouter {
  constructor(private orderService: OrderService) {
    super(paths.order);

    this.router.get("/", (ctx: ParameterizedContext) =>
        this.getAllOrders().then((orders: Order[]): void => {
          ctx.body = orders;
        })
    );

    this.router.post(`${paths.cart}/:cartId`,
      validateBody(createOrderValidator),
      (ctx: ParameterizedContext) =>
        this.createCartOrder({
          note: ctx.request.body.note,
          resourceId: ctx.params.cartId
        }).then(async (orderId: OrderId): Promise<void> => {
            ctx.status = HTTP_STATUS.CREATED;
            ctx.body = { orderId }
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

  /**
   * Get all orders
   */
  @OperationId("get all orders")
  @Security("jwt", ["user"])
  @Get("/")
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }
}