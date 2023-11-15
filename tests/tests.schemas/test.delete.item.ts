import { InternalRouter } from "../../src/utils/schemas/router";
import { HTTP_STATUS } from "../../src/utils/constants/http.statuses";
import { obtainTestDeleteResponse } from "../generators/app.generator";
import { DeleteItemTestCase } from "./test.cases/delete.item.test.case";
import { ResourceNotFoundError } from "../../src/errors/error.module";

export const testDeleteItem = (
  testCase: DeleteItemTestCase,
  router: InternalRouter
) => {
  describe(`DELETE ${router.path}`, () => {
      const deleteItem = (path?: string) => obtainTestDeleteResponse(router, path || testCase.path);
      const invalidPath = `/${testCase.resourceName}/invalid`;


      it(`should delete ${testCase.resourceName}`, async () => {
        const { status, body } = await deleteItem();
        expect(status).toBe(testCase.statusCode || HTTP_STATUS.NO_CONTENT);
        expect(body).toBeDefined();
      });

      it(`shouldn't delete ${testCase.resourceName} so resource cannot be found`, async () => {
        const { status, body } = await deleteItem(invalidPath);
        const expectedError: ResourceNotFoundError = new ResourceNotFoundError(testCase.resourceName);

        expect(status).toBe(HTTP_STATUS.NOT_FOUND);
        expect((body as ResourceNotFoundError).code).toBe(expectedError.code);
        expect((body as ResourceNotFoundError).data).toBe(expectedError.data);
      });
    }
  );
};