import { ProductService } from "../modules/product/product.service";
import { ProductRouter } from "../modules/product/product.router";

export const productService = new ProductService();
export const productRouter = new ProductRouter(productService);