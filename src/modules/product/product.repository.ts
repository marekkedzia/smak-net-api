import { Product, ProductId } from "./product.interfaces";
import { Mongo } from "../../db/mongo";
import { UserId } from "../../utils/schemas/user.id";

export class ProductRepository {
  public static createOne = async (product: Product): Promise<void> => {
    await Mongo.products().insertOne(product);
  };

  public static findOne = (productId: ProductId): Promise<Product | null> =>
    Mongo.products().findOne({ id: productId });

  public static findMany = (ownerId: UserId): Promise<Product[]> =>
    Mongo.products().find({ ownerId: ownerId }).toArray();
}