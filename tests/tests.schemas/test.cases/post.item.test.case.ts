import { Resource } from "../../../src/errors/error.datas";
import { Permission } from "../../../src/auth/permission";

export type PostItemTestCase = {
  resourceName: Resource,
  validBody: { [key: string]: any },
  requiredPermission: Permission,
  path?: string
}