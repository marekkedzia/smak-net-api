import { Product } from "./product.interfaces";

export class ProductMapper {
  public static mapProduct = ({ id, name, description, price, createdAt, ownerId }): Product => ({
    id,
    name,
    description,
    price,
    createdAt,
    ownerId
  });
}