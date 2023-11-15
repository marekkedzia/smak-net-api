import { Permission } from "../../../src/auth/permission";
import { Resource } from "../../../src/utils/constants/resources.names";

export type DeleteItemTestCase = {
  path: string,
  resourceName: Resource,
  requiredPermission: Permission,
  statusCode?: number
}