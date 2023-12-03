import { Permission } from "../../../src/auth/permission";
import { Resource } from "../../../src/utils/constants/resources.names";

export type PutItemTestCase = {
  path: string,
  resourceName: Resource,
  validBody: { [key: string]: any },
  requiredPermission: Permission,
  statusCode?: number,
  invalidPath?: string
}