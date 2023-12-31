import { InternalRouter } from "../../utils/schemas/router";
import { Body, Delete, Get, OperationId, Post, Put, Route, Security } from "tsoa";
import { ProductService } from "./product.service";
import { Product, ProductId, ProductRequest } from "./product.interfaces";
import { validateBody } from "../../utils/validator";
import { productValidator } from "./product.validator";
import { ParameterizedContext } from "koa";
import { HTTP_STATUS } from "../../utils/constants/http.statuses";
import { paths } from "../../config/variables.config";

@Route("/product")
export class ProductRouter extends InternalRouter {
  constructor(private productService: ProductService) {
    super(paths.product);

    this.router.post("/", validateBody(productValidator), async (ctx: ParameterizedContext) => {
      ctx.body = await this.addProduct(ctx.request.body);
      ctx.status = HTTP_STATUS.CREATED;
    });

    this.router.get("/:productId", async (ctx: ParameterizedContext) => {
      ctx.body = await this.getProduct(ctx.params.productId);
    });

    this.router.get("/", async (ctx: ParameterizedContext) => {
      ctx.body = await this.getUserProducts();
    });

    this.router.put("/:productId", validateBody(productValidator), async (ctx: ParameterizedContext) => {
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
   * - category: required, [FRUIT, VEGETABLE, DAIRY, MEAT, BREAD, DRINKS, SNACKS, OTHER]
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
  getProduct(productId: string): Promise<Product> {
    return this.productService.getProduct(productId as ProductId);
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
  updateProduct(productId: string, @Body() productRequest: ProductRequest): Promise<void> {
    return this.productService.updateProduct(productId as ProductId, productRequest);
  }

  /**
   * Delete product
   */
  @OperationId("delete product")
  @Security("jwt", ["admin"])
  @Delete("/{productId}")
  deleteProduct(productId: string): Promise<void> {
    return this.productService.deleteProduct(productId as ProductId);
  }
}