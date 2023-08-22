import { NextFunction, Request, Response } from "express";
import { AppError } from "./error.module";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorCodes } from "./error.codes";
import { ErrorDatas } from "./error.datas";
import { IdService } from "../services/id.service";
import { logger } from "../utils/logger";

interface ErrorHandler {
  (
    error: Error | AppError | AxiosError,
    request: Request,
    response: Response,
    next: NextFunction
  ): void;
}

const internalServerError = { code: ErrorCodes.INTERNAL_SERVER_ERROR, data: ErrorDatas.INTERNAL_SERVER_ERROR };

export const errorHandler: ErrorHandler = (
  error: Error | AppError,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction
) => {
  const status = (error as AppError)?.status || 500;

  const res = (status !== 500) ? {
    code: (error as AppError).code,
    data: (error as AppError).data
  } : internalServerError;

  const id = IdService.provideErrorId();
  if (error instanceof AxiosError && error.response) {
    logAxiosError(error.response, id);
  } else {
    logger.error(`Error ${id}, `, error);
  }

  response.status(status).json({ ...res, id });
};

const logAxiosError = (error: AxiosResponse, id) => {
  const printable = `Status: ${error.status} | Data: ${error.data ? JSON.stringify(error.data) : ""} | Headers: ${JSON.stringify(error.headers)}`;
  logger.error(`Error from external service. ${printable}`, id);
};
