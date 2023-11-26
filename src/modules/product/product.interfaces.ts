import { Opaque } from "ts-opaque";
import { DatabaseObject } from "../../utils/schemas/database.object";

export type ProductId = Opaque<string, Product>

export type Product = ProductRequest & DatabaseObject<ProductId>

export enum CATEGORY {
  FRUIT,
  VEGETABLE,
  DAIRY,
  MEAT ,
  BREAD,
  DRINKS ,
  SNACKS,
  OTHER
}

export type ProductRequest = {
  name: string,
  description: string,
  category: CATEGORY,
  price: number,
}