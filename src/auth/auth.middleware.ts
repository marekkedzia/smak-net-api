import { AuthRequest } from "./auth.request.interface";
import { NextFunction, Response } from "express";
import { PatientPermission } from "./patient.permission";
import { expressJwtSecret, GetVerificationKey } from "jwks-rsa";
import { expressjwt } from "express-jwt";
import { findPermissions } from "./find.permissions";
import { appConfig } from "../config/app.config";
import { Forbidden } from "../errors/error.module";
import { logger } from "../utils/logger";
import { ForbiddenReasons } from "../errors/error.datas";

const AUTH0_SPLIT_SIGN = "|";

export const authMiddleware = expressjwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `${appConfig.AUTH0_ISSUER_BASE_URL}.well-known/jwks.json`
  }) as GetVerificationKey,
  issuer: appConfig.AUTH0_ISSUER_BASE_URL,
  algorithms: ["RS256"]
});

export const auth = (req, res, next) => {
  authMiddleware(req, res, (err: string | Error) => {
      if (err) {
        logger.error(`Unauthorized: ${err}`);
        next(new Forbidden());
        return;
      }
      const userMetadata = req.auth[appConfig.AUTH0_APP_METADATA_CLAIM];
      const roles = userMetadata?.roles;
      const id = req.auth.sub.split(AUTH0_SPLIT_SIGN).pop();

      if (!roles || !id) {
        next(new Forbidden());
        return;
      }

      req.user = {
        id,
        ...req.auth,
        roles,
        permissions: findPermissions(roles)
      };

      next();
    }
  );
};

export const has = (permission: PatientPermission) => (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user.permissions.includes(permission)) next();
  else throw new Forbidden(ForbiddenReasons.NO_REQUIRED_PERMISSIONS);
};
