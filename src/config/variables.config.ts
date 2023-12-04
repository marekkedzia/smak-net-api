import { UserId } from "../utils/schemas/user.id";

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
  }
};

export const paths = {
  file: "/file",
  product: "/product",
  cart: "/cart",
  order: "/order",
  payment: "/payment"
};

export const DUMMY_USER_ID = "DUMMY_USER_ID" as UserId;