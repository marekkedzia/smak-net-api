export enum ErrorDatas {
  UNAUTHORIZED = "Unauthorized",
  INTERNAL_SERVER_ERROR = "Server cannot complete your action. We are working on it!",
  INVALID_DATE_RANGE = "Provided date range is invalid",
}

export enum ForbiddenReasons {
  NO_REQUIRED_PERMISSIONS = " User doesn't have required permissions.",
  PARTY_EVENT_IS_NOT_OPEN = " Party event is not open.",
  PARTY_EVENT_ALREADY_CLOSED = " Party event is already closed.",
}

export enum Resource {
  EVENT = "event",
}
