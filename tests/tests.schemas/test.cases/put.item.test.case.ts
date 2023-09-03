import { Resource } from "../../../src/errors/error.datas";
import { RoutePermission } from "../../../src/auth/permission";

export type PutItemTestCase = {
  path: string,
  resourceName: Resource,
  validBody: { [key: string]: any },
  requiredPermission: RoutePermission,
  statusCode?: number
}