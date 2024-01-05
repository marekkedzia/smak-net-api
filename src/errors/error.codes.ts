export enum ErrorCodes {
  INTERNAL_SERVER_ERROR = "error/internal",
  UNAUTHORIZED = "error/unauthorized",
  VALIDATOR_ERROR = "error/data-error",
  RESOURCE_NOT_FOUND = "error/resource-not-found",
  RESOURCE_NOT_PART_OF_REQUEST = "error/resource-not-part-of-request",
  INVALID_DATE_RANGE = "error/invalid-date-range",
  FILES_UPLOAD_FAILED = "error/files-upload-failed",
  INVALID_CART_STATE_TRANSITION = "error/invalid-cart-state-transition",
  MISSING_STRIPE_SIGNATURE = 'error/missing-stripe-signature',
  UNHANDLED_STRIPE_EVENT = "error/unhandled-stripe-event",
}