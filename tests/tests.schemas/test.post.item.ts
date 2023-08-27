import { DatabaseObject } from "../../src/utils/schemas/database.object";
import { InternalRouter } from "../../src/utils/schemas/router";
import { HTTP_STATUS } from "../../src/utils/constants/http.statuses";
import { obtainTestPostResponse } from "../generators/app.generator";
import { PostItemTestCase } from "./test.cases/post.item.test.case";

export const testPostItem = <SourceType extends DatabaseObject<string, Object>>(
  testCase: PostItemTestCase,
  router: InternalRouter,
  unrequiredBodyProperties?: string[]
) => {
  describe(`POST ${router.path}`, () => {
      const path = testCase.path || router.path;
      const postItem = (body) => obtainTestPostResponse(router, path, body);
      const isObject = (value): boolean => typeof value === "object";
      const isArray = (value): boolean => Array.isArray(value);


      it(`should post ${testCase.resourceName}`, async () => {
        const { status, body } = await postItem(testCase.validBody);
        expect(status).toBe(HTTP_STATUS.CREATED);
        expect(body).toBeDefined();
      });

      const validateMissingProperties = (body): void => {
        for (const key of Object.keys(body)) {
          if (isObject(body[key]))
            validateMissingProperties(body[key]);

          if (!unrequiredBodyProperties?.includes(key))
            it(`shouldn't post ${testCase.resourceName} so ${key} is missing`, async () => {
              const bodyWithMissingKey = { ...body };
              delete bodyWithMissingKey[key];
              const { status } = await postItem(bodyWithMissingKey);

              expect(status).toBe(HTTP_STATUS.UNPROCESSABLE_ENTITY);
            });
        }
      };

      const validateWrongTypes = (body): void => {
        const wrongStringType = "wrongType";
        const wrongObjectType = { wrongType: "wrongType" };

        for (const key of Object.keys(body)) {
          if (isObject(body[key]))
            validateWrongTypes(body[key]);

          it(`shouldn't post ${testCase.resourceName} so ${key} is wrong type`, async () => {
            const bodyWithWrongType = { ...body };
            bodyWithWrongType[key] = isObject(body[key]) || isArray(body[key]) ? wrongStringType : wrongObjectType;
            const { status } = await postItem(bodyWithWrongType);

            expect(status).toBe(HTTP_STATUS.UNPROCESSABLE_ENTITY);
          });
        }
      };

      validateMissingProperties(testCase.validBody);
      validateWrongTypes(testCase.validBody);
    }
  );
};