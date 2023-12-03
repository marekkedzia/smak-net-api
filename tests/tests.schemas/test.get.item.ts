import { DatabaseObject } from "../../src/utils/schemas/database.object";
import { GetItemTestCase } from "./test.cases/get.item.test.case";
import { InternalRouter } from "../../src/utils/schemas/router";
import { HTTP_STATUS } from "../../src/utils/constants/http.statuses";
import { ResourceNotFoundError } from "../../src/errors/error.module";
import { obtainTestGetResponse } from "../generators/app.generator";
import { validateQuery } from "./test.query";

export const testGetItem = <SourceType extends DatabaseObject<string>, ExpectedType>(
  testCase: GetItemTestCase<SourceType, ExpectedType>,
  router: InternalRouter
) => {
  describe(`GET ${router.path}`, () => {
    const getResponse = async (path: string) => await obtainTestGetResponse(router, path);
    const validResourceId = testCase.source.id;
    const validPath = testCase.path || `${router.path}/${validResourceId}`;
    const pathWithInvalidId = createPathWithInvalidId(validPath, router.path);

    it(`should get ${testCase.resourceName}`, async () => {
      const { status, body } = await getResponse(validPath);

      expect(status).toBe(HTTP_STATUS.OK);
      expect(body).toStrictEqual(testCase.expected);
    });

    if (isPathLengthGreaterThanTwo(validPath)) {
      it(`shouldn't get ${testCase.resourceName} as resource cannot be found`, async () => {
        const { status, body } = await getResponse(pathWithInvalidId);
        const expectedError = new ResourceNotFoundError(testCase.resourceName);

        validateNotFoundError(body, expectedError, status);
      });
    }

    if (testCase.queryParameterKey) {
      validateQuery(testCase.queryParameterKey)(
        (path) => obtainTestGetResponse(router, stripQueryFromPath(validPath).concat(path))
      );
    }
  });
};

const createPathWithInvalidId = (validPath: string, basePath: string): string => {
  const [_, query] = validPath.split("?");
  return `${basePath}/invalid-id${query ? `?${query}` : ""}`;
};

const isPathLengthGreaterThanTwo = (path: string): boolean => {
  return path.split("/").length > 2;
};

const validateNotFoundError = (body: any, expectedError: ResourceNotFoundError, status: number) => {
  expect(status).toBe(HTTP_STATUS.NOT_FOUND);
  expect(body.code).toBe(expectedError.code);
  expect(body.data).toBe(expectedError.data);
};

const stripQueryFromPath = (path: string): string =>
  path.split("?")[0];