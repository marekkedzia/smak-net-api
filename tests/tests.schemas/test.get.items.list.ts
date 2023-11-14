import { InternalRouter } from "../../src/utils/schemas/router";
import { DatabaseObject } from "../../src/utils/schemas/database.object";
import { GetItemTestCase } from "./test.cases/get.item.test.case";
import { obtainTestGetResponse } from "../generators/app.generator";
import { HTTP_STATUS } from "../../src/utils/constants/http.statuses";


export const testGetItemList = <SourceType extends DatabaseObject<string>[], ExpectedType>(
  testCase: GetItemTestCase<SourceType, ExpectedType>,
  router: InternalRouter
) => {
  describe(`GET ${router.path}`, () => {
      const getResponse = () => obtainTestGetResponse(router, router.path);

        it(`should get ${testCase.resourceName} list ${testCase.expected}`, async () => {
          const { status, body } = await getResponse();

          expect(status).toBe(HTTP_STATUS.OK);
          expect(body).toStrictEqual(testCase.expected);
        });
    }
  );
};