import { InternalRouter } from "../../src/utils/schemas/router";
import { HTTP_STATUS } from "../../src/utils/constants/http.statuses";
import { obtainTestPutResponse } from "../generators/app.generator";
import { validateMissingProperties } from "./utils/validate.missing.properties";
import { validateWrongTypes } from "./utils/validate.wrong.property.types";
import { PutItemTestCase } from "./test.cases/put.item.test.case";

export const testPutItem = (
  testCase: PutItemTestCase,
  router: InternalRouter,
  unrequiredBodyProperties?: string[]
) => {
  describe(`PUT ${router.path}`, () => {
      const putItem = (body) => obtainTestPutResponse(router, testCase.path, body);


      it(`should put ${testCase.resourceName}`, async () => {
        const { status, body } = await putItem(testCase.validBody);
        expect(status).toBe(testCase.statusCode || HTTP_STATUS.NO_CONTENT);
        expect(body).toBeDefined();
      });

      validateMissingProperties(testCase.validBody, testCase.resourceName, putItem, unrequiredBodyProperties);
      validateWrongTypes(testCase.validBody, testCase.resourceName, putItem);
    }
  );
};