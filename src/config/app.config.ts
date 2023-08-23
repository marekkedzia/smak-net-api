import { config } from "dotenv-flow";
import * as process from "process";

config();
export const required = (key: string, variable?: string) => {
  if (!variable)
    throw new Error(`Required property is missing: ${key} on level ${process.env.NODE_ENV}`);
  return variable;
};

export const appConfig = {
  PORT: process.env.PORT || 3000,
  LOGGING_LEVEL: process.env.LOGGING_LEVEL || "info",
  MONGO_URL: required("MONGO_URL", process.env.MONGO_URL),
  AUTH0_ISSUER_BASE_URL: required("AUTH0_ISSUER_BASE_URL", process.env.AUTH0_ISSUER_BASE_URL),
  AUTH0_CLIENT_ID: required("AUTH0_CLIENT_ID", process.env.AUTH0_CLIENT_ID),
  AUTH0_CLIENT_SECRET: required("AUTH0_CLIENT_SECRET", process.env.AUTH0_CLIENT_SECRET),
  AUTH0_DOMAIN: required("AUTH0_DOMAIN", process.env.AUTH0_DOMAIN),
  AUTH0_APP_METADATA_CLAIM: required("AUTH0_APP_METADATA_CLAIM", process.env.AUTH0_APP_METADATA_CLAIM),
  AUTH0_DATABASE_CONNECTION: required("AUTH0_DATABASE_CONNECTION", process.env.AUTH0_DATABASE_CONNECTION),
  AWS_REGION: required("AWS_REGION", process.env.AWS_REGION),
  MEDCASE_CLIENT_ID: required("MEDCASE_CLIENT_ID", process.env.MEDCASE_CLIENT_ID),
  MEDCASE_CLIENT_SECRET: required("MEDCASE_CLIENT_SECRET", process.env.MEDCASE_CLIENT_SECRET),
  MEDCASE_PROJECT_ID: required("MEDCASE_PROJECT_PROJECT", process.env.MEDCASE_PROJECT_ID),
  MEDCASE_API_URL: required("MEDCASE_API_URL", process.env.MEDCASE_API_URL),
  MEDCASE_OAUTH_AUDIENCE: required("MEDCASE_OAUTH_AUDIENCE", process.env.MEDCASE_OAUTH_AUDIENCE),
  MEDCASE_OAUTH_URL: required("MEDCASE_OAUTH_URL", process.env.MEDCASE_OAUTH_URL)
};