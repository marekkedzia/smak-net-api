import { Response } from "../utils/response";
import { Permission } from "../../src/auth/permission";

export const testPermissionAccess = (resourceName: string, requiredPermission: Permission, getResponse: () => Promise<Response>) => {
  // it(`shouldn't get ${resourceName} so user doesn't have permission`, async () => {
  //   const { status, body } = await getResponse();
  //   const expectedError: Forbidden = new Forbidden(ForbiddenReasons.NO_REQUIRED_PERMISSIONS);
  //
  //   expect(status).toBe(HTTP_STATUS.FORBIDDEN);
  //   expect(body.code).toBe(expectedError.code);
  //   expect(body.data).toBe(expectedError.data);
  // });
};