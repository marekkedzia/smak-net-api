import { AuthRequest } from "../auth/auth.request.interface";
import { NextFunction, Response } from "express";
import { internalLocalStorage } from "../config/internal.local.storage.config";
import { UserId } from "../utils/schemas/user.id";

export const storeUserId = (req: AuthRequest, _: Response, next: NextFunction) => {
  internalLocalStorage.storeUserId(req.user.id as UserId);
  next();
};
