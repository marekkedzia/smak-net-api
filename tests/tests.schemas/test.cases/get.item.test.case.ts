import { Document } from "mongodb";
import { Resource } from "../../../src/errors/error.datas";
import { RoutePermission } from "../../../src/auth/permission";

export type GetItemTestCase<SourceType extends Document, ExpectedType> = {
  source: SourceType,
  expected: ExpectedType,
  resourceName: Resource,
  requiredPermission: RoutePermission,
  path?: string
}