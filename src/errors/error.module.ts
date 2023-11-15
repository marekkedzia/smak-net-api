import { ErrorCodes } from "./error.codes";
import { ErrorDatas, ForbiddenReasons } from "./error.datas";
import { HTTP_STATUS } from "../utils/constants/http.statuses";
import { Resource } from "../utils/constants/resources.names";

export interface AppError {
  status: number,
  code: string,
  data: string | ValidationErrorData,
  serverMessage?: string
}

interface ValidationErrorData {
  info: string,
  invalidProperties?: string[],
  userInputValue?: string
}

export class InternalServerError implements AppError {
  status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  code = ErrorCodes.INTERNAL_SERVER_ERROR;
  data = ErrorDatas.INTERNAL_SERVER_ERROR;
}

export class Forbidden implements AppError {
  status = HTTP_STATUS.FORBIDDEN;
  code = ErrorCodes.UNAUTHORIZED;
  data;

  constructor(reason?: ForbiddenReasons) {
    this.data = `${ErrorDatas.UNAUTHORIZED}.${reason || ""}`;
  }
}

export class ValidationErrors implements AppError {
  status = HTTP_STATUS.UNPROCESSABLE_ENTITY;
  code = ErrorCodes.VALIDATOR_ERROR;
  data;

  constructor(message: string, expected: string, received: string) {
    this.data = { message, expected, received };
  }
}

export class ResourceNotFoundError implements AppError {
  status = HTTP_STATUS.NOT_FOUND;
  code = ErrorCodes.RESOURCE_NOT_FOUND;
  data;

  constructor(resource?: Resource) {
    this.data = `Resource ${resource || ""} wasn't found for given credentials.`;
  }
}

export class FilesUploadFailed implements AppError {
  status = HTTP_STATUS.BAD_REQUEST;
  code = ErrorCodes.FILES_UPLOAD_FAILED;
  data = ErrorDatas.FILES_UPLOAD_FAILED;

  constructor(private reason:unknown) {
  }
}

export class ResourceNotPartOfRequest implements AppError {
  status = HTTP_STATUS.BAD_REQUEST;
  code = ErrorCodes.RESOURCE_NOT_PART_OF_REQUEST;
  data;

  constructor(resource: Resource) {
    this.data = `Resource ${resource} is not a part of request. Please attach it and try again.`;
  }
}

export class DateRangeInvalid implements AppError {
  status = HTTP_STATUS.BAD_REQUEST;
  code = ErrorCodes.INVALID_DATE_RANGE;
  data = ErrorDatas.INVALID_DATE_RANGE;
}