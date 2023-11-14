import { InternalRouter } from "../../utils/schemas/router";
import { Body, Get, OperationId, Post, Route, Security } from "tsoa";
import { ProductService } from "./product.service";
import { Product, ProductId, ProductRequest } from "./product.interfaces";
import { validate } from "../../utils/validator";
import { productValidator } from "./product.validator";
import { ParameterizedContext } from "koa";
import { HTTP_STATUS } from "../../utils/constants/http.statuses";

@Route("/product")
export class ProductRouter extends InternalRouter {
  constructor(private productService: ProductService) {
    super("/product");

    this.router.post("/", validate(productValidator), async (ctx: ParameterizedContext) => {
      ctx.body = await this.addProduct(ctx.request.body);
      ctx.status = HTTP_STATUS.CREATED;
    });

    this.router.get("/:productId", async (ctx: ParameterizedContext) => {
      ctx.body = await this.getProduct(ctx.params.productId);
    });

    this.router.get("/", async (ctx: ParameterizedContext) => {
      ctx.body = await this.getUserProducts();
    });
  }

  /**
   * Add product available for sale
   * Validator requirements:
   * - name: required, string, max length 255
   * - description: required, string, max length 2048
   * - price: required, number, positive
   */
  @OperationId("add product")
  @Security("jwt", ["admin"])
  @Post("/")
  addProduct(@Body() productRequest: ProductRequest): Promise<ProductId> {
    return this.productService.addProduct(productRequest);
  }

  /**
   * Get product
   */
  @OperationId("get product")
  @Security("jwt", ["user:read"])
  @Get("/{productId}")
  getProduct(productId: ProductId): Promise<Product> {
    return this.productService.getProduct(productId);
  }

  /**
   * Get user products
   */
  @OperationId("get user products")
  @Security("jwt", ["user:read"])
  @Get("/{user}")
  getUserProducts(): Promise<Product[]> {
    return this.productService.getUserProducts();
  }
}