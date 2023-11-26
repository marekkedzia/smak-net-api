import { Product } from "./product.interfaces";

export class ProductMapper {
  public static mapProduct = ({ id, name, description, price, createdAt, ownerId, category }): Product => ({
    id,
    name,
    description,
    category,
    price,
    createdAt,
    ownerId
  });
}