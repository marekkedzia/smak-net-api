import { Permission } from "../../../src/auth/permission";
import { Resource } from "../../../src/utils/constants/resources.names";

export type PostItemTestCase = {
  resourceName: Resource,
  validBody: { [key: string]: any },
  requiredPermission: Permission,
  path?: string
}