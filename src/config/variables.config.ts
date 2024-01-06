import { UserId } from "../utils/schemas/user.id";
import { appConfig } from './app.config';

export const variablesConfig = {
  maxProductNameLength: 255,
  maxProductDescriptionLength: 2048,
  maxFilesNumberExceededMessage: "Max files number exceeded",
  serverCannotHandleFileUploadMessage: "Server cannot handle file upload",
  maxFilesUploadNumber: 10,
  mimeTypeSplitter: "/",
  handledCurrencies: {
    PLN: "PLN"
  },
  categories: {
    FRUIT: "FRUIT",
    VEGETABLE: "VEGETABLE",
    DAIRY: "DAIRY",
    MEAT: "MEAT",
    BREAD: "BREAD",
    DRINKS: "DRINKS",
    SNACKS: "SNACKS",
    OTHER: "OTHER"
  },
  stripeApiVersion: "2023-10-16",
  allowedPaymentMethods: ["card", "p24", "blik"],
  paymentMode: 'payment',
  stripeSignatureHeader: "stripe-signature"
};

export const paths = {
  file: "/file",
  product: "/product",
  cart: "/cart",
  order: "/order",
  payment: "/payment",
  webhook: "/webhook"
};

export enum webhookEventTypes  {
    PAYMENT_SUCCEEDED = "payment_intent.succeeded",
    PAYMENT_FAILED = "payment_intent.payment_failed"
}

export const DUMMY_USER_ID = "DUMMY_USER_ID" as UserId;