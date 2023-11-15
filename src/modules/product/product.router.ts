import { InternalRouter } from "../../utils/schemas/router";
import { Body, Delete, Get, OperationId, Post, Put, Route, Security } from "tsoa";
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

    this.router.put("/:productId", validate(productValidator), async (ctx: ParameterizedContext) => {
      await this.updateProduct(ctx.params.productId, ctx.request.body);
      ctx.status = HTTP_STATUS.NO_CONTENT;
    });

    this.router.delete("/:productId", async (ctx: ParameterizedContext) => {
      await this.deleteProduct(ctx.params.productId);
      ctx.status = HTTP_STATUS.NO_CONTENT;
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

  /**
   * Update product
   */
  @OperationId("update product")
  @Security("jwt", ["admin"])
  @Put("/{productId}")
  updateProduct(productId: ProductId, @Body() productRequest: ProductRequest): Promise<void> {
    return this.productService.updateProduct(productId, productRequest);
  }

  /**
   * Delete product
   */
  @OperationId("delete product")
  @Security("jwt", ["admin"])
  @Delete("/{productId}")
  deleteProduct(productId: ProductId): Promise<void> {
    return this.productService.deleteProduct(productId);
  }
}