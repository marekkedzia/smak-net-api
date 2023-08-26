import { Document } from "mongodb";
import { Resource } from "../../src/errors/error.datas";
import { Permissions } from "../../src/auth/permissions";

export type GetItemTestCase<SourceType extends Document, ExpectedType> = {
  source: SourceType,
  expected: ExpectedType,
  resourceName: Resource,
  requiredPermission: Permissions,
}