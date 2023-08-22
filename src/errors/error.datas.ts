export enum ErrorDatas {
  UNAUTHORIZED = "Unauthorized",
  INTERNAL_SERVER_ERROR = "Server cannot complete your action. We are working on it!",
  INVALID_DATE_RANGE = "Provided date range is invalid",
}

export enum ForbiddenReasons {
  NO_REQUIRED_AUTHORIZATIONS = " User doesn't have required authorizations",
  HAS_ALREADY_SCHEDULED_MEETING = " User has already scheduled meeting for given treatment package",
  NO_REQUIRED_PERMISSIONS = " User doesn't have required permissions",
  SURVEY_NUMBER_EXCEEDED = " User has already completed survey",
  TREATMENT_DOESNT_EXIST = " Treatment doesn't exist",
}

export enum Resource {
  EVENT = "event",
}
