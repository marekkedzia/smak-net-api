import { v4 as uuid } from "uuid";
import { ErrorId } from "../errors/error.id";
import { InternalEventId } from "../internal.event/internal.event.id";
import { RequestId } from "./schemas/request.id";
import { ProductId } from "../modules/product/product.interfaces";
import { FileId, FileKey } from "../modules/file/file.interfaces";
import { CartId } from "../modules/cart/cart.interfaces";
import { UserId } from "./schemas/user.id";
import { PaymentId } from "../modules/payment/payment.interfaces";

export class IdUtils {
  private static provideId = uuid;
  public static provideErrorId = (): ErrorId => `${IdPrefix.ERROR}-${this.provideId()}` as ErrorId;
  public static provideInternalEventId = (): InternalEventId => `${IdPrefix.INTERNAL_EVENT}-${this.provideId()}` as InternalEventId;
  public static provideRequestId = (): RequestId => `${IdPrefix.REQUEST_ID}-${this.provideId()}` as RequestId;
  public static provideProductId = (): ProductId => `${IdPrefix.PRODUCT_ID}-${this.provideId()}` as ProductId;
  public static provideFileId = (): FileId => `${IdPrefix.FILE_ID}-${this.provideId()}` as FileId;
  public static provideFileKey = (userId: UserId, mimeType: string, fileName: string): FileKey => `${userId}-${fileName}-${this.provideId()}.${mimeType}` as FileKey;
  public static provideCartId = (): CartId => `${IdPrefix.CART_ID}-${this.provideId()}` as CartId;
  public static providePaymentId = (): PaymentId => `${IdPrefix.PAYMENT_ID}-${this.provideId()}` as PaymentId;
}

enum IdPrefix {
  ERROR = "err",
  INTERNAL_EVENT = "ie",
  REQUEST_ID = "req",
  PRODUCT_ID = "pr",
  FILE_ID = "f",
  FILE_KEY = "fk",
  CART_ID = "c",
  PAYMENT_ID = "py"
}