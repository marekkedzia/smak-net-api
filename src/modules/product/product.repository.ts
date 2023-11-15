import { Product, ProductId, ProductRequest } from "./product.interfaces";
import { Mongo } from "../../db/mongo";
import { UserId } from "../../utils/schemas/user.id";

export class ProductRepository {
  public static createOne = async (product: Product): Promise<void> => {
    await Mongo.products().insertOne(product);
  };

  public static findOne = (productId: ProductId): Promise<Product | null> =>
    Mongo.products().findOne({ id: productId });

  public static findManyByOwnerId = (ownerId: UserId): Promise<Product[]> =>
    Mongo.products().find({ ownerId: ownerId }).toArray();

  public static updateOne = (productId: ProductId, ownerId: UserId, product: ProductRequest): Promise<{
    updated: boolean
  }> =>
    Mongo.products().updateOne(
      {
        id: productId,
        ownerId: ownerId
      },
      {
        $set: { description: product.description, name: product.name, price: product.price }
      }
    ).then(result => ({ updated: result.modifiedCount === 1 }));

  public static deleteOne = (productId: ProductId, ownerId: UserId): Promise<{ deleted: boolean }> =>
    Mongo.products().deleteOne({
      id: productId,
      ownerId: ownerId
    }).then(result => ({ deleted: result.deletedCount === 1 }));
}