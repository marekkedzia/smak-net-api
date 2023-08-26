import { DatabaseObject } from "../../src/utils/schemas/database.object";
import { GetItemTestCase } from "./get.item.test.case";
import { InternalRouter } from "../../src/utils/schemas/router";
import { HTTP_STATUS } from "../../src/utils/constants/http.statuses";
import { ResourceNotFoundError } from "../../src/errors/error.module";
import { obtainTestGetResponse } from "../generators/app.generator";

export const testGetItem = <SourceType extends DatabaseObject<string, Object>, ExpectedType>(
  testCase: GetItemTestCase<SourceType, ExpectedType>,
  router: InternalRouter
) => {
  describe(`GET ${router.path}`, () => {
      const getResponse = (path: string) => obtainTestGetResponse(router, path);
      const validResourceId = testCase.source.id;
      const invalidResourceId = `${validResourceId}-invalid`;

      // it(`shouldn't get ${resourceName} so user doesn't have permission`, async () => {
      //   const { status, body } = await getResponse();
      //   const expectedError: Forbidden = new Forbidden(ForbiddenReasons.NO_REQUIRED_PERMISSIONS);
      //
      //   expect(status).toBe(HTTP_STATUS.FORBIDDEN);
      //   expect(body.code).toBe(expectedError.code);
      //   expect(body.data).toBe(expectedError.data);
      // }); //TODO uncomment when auth ready

      it(`should get ${testCase.resourceName}`, async () => {
        const { status, body } = await getResponse(`${router.path}/${validResourceId}`);

        expect(status).toBe(HTTP_STATUS.OK);
        expect(body).toStrictEqual(testCase.expected);
      });

      it(`shouldn't get ${testCase.resourceName} so resource cannot be found`, async () => {
        const { status, body } = await getResponse(`${router.path}/${invalidResourceId}`);
        const expectedError: ResourceNotFoundError = new ResourceNotFoundError(testCase.resourceName);

        expect(status).toBe(HTTP_STATUS.NOT_FOUND);
        expect(body.code).toBe(expectedError.code);
        expect(body.data).toBe(expectedError.data);
      });
    }
  );
};