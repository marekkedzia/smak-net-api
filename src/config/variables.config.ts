export const variablesConfig = {
  maxProductNameLength: 255,
  maxProductDescriptionLength: 2048,
  maxFilesNumberExceededMessage: "Max files number exceeded",
  serverCannotHandleFileUploadMessage: "Server cannot handle file upload",
  maxFilesUploadNumber: 10,
};

export const paths = {
  file: "/file",
  product: "/product"
};

export enum CATEGORY {
  FRUIT = "FRUIT",
  VEGETABLE = "VEGETABLE",
  DAIRY = "DAIRY",
  MEAT = "MEAT",
  BREAD = "BREAD",
  DRINKS = "DRINKS",
  SNACKS = "SNACKS",
  OTHER = "OTHER"
}