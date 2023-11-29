import { CartService } from "../modules/cart/cart.service";
import { CartRouter } from "../modules/cart/cart.router";
import { ProductService } from "../modules/product/product.service";

const cartService = new CartService(new ProductService().isProductAvailable);
export const cartRouter = new CartRouter(cartService);