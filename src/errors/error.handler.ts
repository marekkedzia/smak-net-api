import { AppError } from "./error.module";
import { ErrorCodes } from "./error.codes";
import { ErrorDatas } from "./error.datas";
import { IdUtils } from "../utils/id.utils";
import { logger } from "../utils/logger";
import { Context, Next } from "koa";

const internalServerError = { code: ErrorCodes.INTERNAL_SERVER_ERROR, data: ErrorDatas.INTERNAL_SERVER_ERROR };

export const errorHandler = async (
  ctx: Context,
  next: Next
) => {
  try {
    await next();
  } catch (error) {
    const status = (error as AppError)?.status || 500;

    const res = (status !== 500) ? {
      code: (error as AppError).code,
      data: (error as AppError).data
    } : internalServerError;

    const id = IdUtils.provideErrorId();

    logger.error(`Error ${id}, `, error);

    ctx.status = status;
    ctx.body = {
      ...res, id
    };
  }
};

