import { Product, ProductId, ProductRequest } from "./product.interfaces";
import { IdUtils } from "../../utils/id.utils";
import { DateUtils } from "../../utils/date.utils";
import { ProductRepository } from "./product.repository";
import { internalLocalStorage } from "../../config/internal.local.storage.config";
import { logger } from "../../utils/logger";
import { ResourceNotFoundError } from "../../errors/error.module";
import { Resource } from "../../utils/constants/resources.names";
import { ProductMapper } from "./product.mapper";

export class ProductService {

  addProduct = async (productRequest: ProductRequest): Promise<ProductId> => {
    const product: Product = {
      id: IdUtils.provideProductId(),
      createdAt: DateUtils.getDateNow(),
      ownerId: internalLocalStorage.getUserId(),
      ...productRequest
    };

    await ProductRepository.createOne(product);

    logger.silly(`Added product: ${product.id} 
    for user: ${internalLocalStorage.getUserId()}
    with request id: ${internalLocalStorage.getRequestId()}
    `);

    return product.id;
  };

  getProduct = async (productId: ProductId): Promise<Product> => {
    const product: Product | null = await ProductRepository.findOne(productId);

    if (!product)
      throw new ResourceNotFoundError(Resource.PRODUCT);

    logger.silly(`Obtained product: ${product.id} 
    for user: ${internalLocalStorage.getUserId()}
    with request id: ${internalLocalStorage.getRequestId()}
    `);

    return ProductMapper.mapProduct(product);
  };

  getUserProducts = async (): Promise<Product[]> => {
    const products: Product[] = await ProductRepository.findManyByOwnerId(internalLocalStorage.getUserId())
      .then((p: Product[]) => p.map(ProductMapper.mapProduct));

    logger.silly(`Obtained products: ${products.map(product => product.id)} 
    for user: ${internalLocalStorage.getUserId()}
    with request id: ${internalLocalStorage.getRequestId()}
    `);

    return products;
  };

  updateProduct = async (productId: ProductId, productRequest: ProductRequest): Promise<void> => {
    const { updated } = await ProductRepository.updateOne(productId, internalLocalStorage.getUserId(), productRequest);

    if (!updated)
      throw new ResourceNotFoundError(Resource.PRODUCT);

    logger.silly(`Updated product: ${productId} 
    for user: ${internalLocalStorage.getUserId()}
    with request id: ${internalLocalStorage.getRequestId()}
    `);
  };

  deleteProduct = async (productId: ProductId): Promise<void> => {
    const { deleted } = await ProductRepository.deleteOne(productId, internalLocalStorage.getUserId());

    if (!deleted)
      throw new ResourceNotFoundError(Resource.PRODUCT);

    logger.silly(`Deleted product: ${productId} 
    for user: ${internalLocalStorage.getUserId()}
    with request id: ${internalLocalStorage.getRequestId()}
    `);
  };

  isProductAvailable = async (productId: ProductId): Promise<boolean> =>
    ProductRepository.findOne(productId).then((product: Product | null) => !!product);
}