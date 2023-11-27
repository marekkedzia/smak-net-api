import { ZodObject } from "zod";
import { Context, Next } from "koa";
import { logger } from "./logger";
import { ValidationErrors } from "../errors/error.module";
import { internalLocalStorage } from "../config/internal.local.storage.config";

export const validateBody = (object: ZodObject<any, any>) => (ctx: Context, next: Next) => {
  try {
    object.parse(ctx.request.body);
  } catch (error) {
    catchValidationErrors(error);
  }

  return next();
};

export const validateQuery = (object: ZodObject<any, any>) => (ctx: Context, next: Next) => {
  try {
    object.parse(ctx.query);
  } catch (error) {
    catchValidationErrors(error);
  }

  return next();
};

export const catchValidationErrors = (error: any) => {
  logger.error(`Validation error: ${JSON.stringify(error)} for request: ${internalLocalStorage.getRequestId()}`);
  throw new ValidationErrors(`${error.code} - ${error.path}`, error.expected, error.received);
};