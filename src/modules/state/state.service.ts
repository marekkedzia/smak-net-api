import { Product, ProductId } from "../product/product.interfaces";
import { ProductRepository } from "../product/product.repository";
import { ResourceNotFoundError } from "../../errors/error.module";
import { Resource } from "../../utils/constants/resources.names";

export class StateService {
  validateImageUploadAccess = async (productId: ProductId): Promise<void> => {
    const product: Product | null = await ProductRepository.findOne(productId);

    if (!product)
      throw new ResourceNotFoundError(Resource.PRODUCT);
  };
}