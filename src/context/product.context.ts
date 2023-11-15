import { ProductService } from "../modules/product/product.service";
import { ProductRouter } from "../modules/product/product.router";
import { DevService } from "../modules/dev/dev.service";

export const productService = new ProductService();
export const productRouter = new ProductRouter(productService);