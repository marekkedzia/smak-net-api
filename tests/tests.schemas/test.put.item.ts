import { InternalRouter } from "../../src/utils/schemas/router";
import { HTTP_STATUS } from "../../src/utils/constants/http.statuses";
import { obtainTestPutResponse } from "../generators/app.generator";
import { validateMissingProperties } from "./utils/validate.missing.properties";
import { validateWrongTypes } from "./utils/validate.wrong.property.types";
import { PutItemTestCase } from "./test.cases/put.item.test.case";
import { ResourceNotFoundError } from "../../src/errors/error.module";

export const testPutItem = (
  testCase: PutItemTestCase,
  router: InternalRouter,
  unrequiredBodyProperties?: string[]
) => {
  describe(`PUT ${router.path}`, () => {
      const putItem = (body, path?: string) => obtainTestPutResponse(router, path || testCase.path, body);
      const invalidPath = `/${testCase.resourceName}/invalid`;

      it(`should put ${testCase.resourceName}`, async () => {
        const { status, body } = await putItem(testCase.validBody);
        expect(status).toBe(testCase.statusCode || HTTP_STATUS.NO_CONTENT);
        expect(body).toBeDefined();
      });

      it(`shouldn't put ${testCase.resourceName} so resource cannot be found`, async () => {
        const { status, body } = await putItem(testCase.validBody, invalidPath);
        const expectedError: ResourceNotFoundError = new ResourceNotFoundError(testCase.resourceName);

        expect(status).toBe(HTTP_STATUS.NOT_FOUND);
        expect((body as ResourceNotFoundError).code).toBe(expectedError.code);
        expect((body as ResourceNotFoundError).data).toBe(expectedError.data);
      });

      validateMissingProperties(testCase.validBody, testCase.resourceName.toString(), putItem, unrequiredBodyProperties);
      validateWrongTypes(testCase.validBody, testCase.resourceName.toString(), putItem);
    }
  );
};