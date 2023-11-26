import { Opaque } from "ts-opaque";
import { DatabaseObject } from "../../utils/schemas/database.object";
import { CATEGORY } from '../../config/variables.config';

export type ProductId = Opaque<string, Product>

export type Product = ProductRequest & DatabaseObject<ProductId>

export type ProductRequest = {
  name: string,
  description: string,
  category: CATEGORY,
  price: number,
}