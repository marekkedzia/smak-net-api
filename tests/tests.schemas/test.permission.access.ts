import { Response } from "../utils/response";
import { RoutePermission } from "../../src/auth/permission";

export const testPermissionAccess = (resourceName: string, requiredPermission: RoutePermission, getResponse: () => Promise<Response>) => {
  // it(`shouldn't get ${resourceName} so user doesn't have permission`, async () => {
  //   const { status, body } = await getResponse();
  //   const expectedError: Forbidden = new Forbidden(ForbiddenReasons.NO_REQUIRED_PERMISSIONS);
  //
  //   expect(status).toBe(HTTP_STATUS.FORBIDDEN);
  //   expect(body.code).toBe(expectedError.code);
  //   expect(body.data).toBe(expectedError.data);
  // });
};