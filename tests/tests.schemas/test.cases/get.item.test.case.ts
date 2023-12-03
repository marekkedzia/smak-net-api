import { Document } from "mongodb";
import { Permission } from "../../../src/auth/permission";
import { Resource } from "../../../src/utils/constants/resources.names";

export type GetItemTestCase<SourceType extends Document, ExpectedType> = {
  source: SourceType,
  expected: ExpectedType,
  resourceName: Resource,
  requiredPermission: Permission,
  path?: string,
  queryParameterKey?: string
}