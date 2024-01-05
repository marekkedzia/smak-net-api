export enum ErrorDatas {
  UNAUTHORIZED = "Unauthorized",
  INTERNAL_SERVER_ERROR = "Server cannot complete your action. We are working on it!",
  INVALID_DATE_RANGE = "Provided date range is invalid",
  FILES_UPLOAD_FAILED = "File upload failed",
  INVALID_CART_STATE_TRANSITION = "Invalid cart state transition",
  MISSING_STRIPE_SIGNATURE = "Missing or invalid Stripe signature",
  UNHANDLED_STRIPE_EVENT = "Unhandled Stripe event type",
}

export enum ForbiddenReasons {
  NO_REQUIRED_PERMISSIONS = "User doesn't have required permissions.",
}