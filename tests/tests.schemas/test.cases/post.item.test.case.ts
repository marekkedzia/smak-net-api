import { Resource } from "../../../src/errors/error.datas";
import { RoutePermission } from "../../../src/auth/permission";

export type PostItemTestCase = {
  resourceName: Resource,
  validBody: { [key: string]: any },
  requiredPermission: RoutePermission,
  path?: string
}