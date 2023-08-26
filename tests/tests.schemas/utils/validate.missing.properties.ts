import { HTTP_STATUS } from "../../../src/utils/constants/http.statuses";
import { isObject } from "./check.type";
import { Response } from "../../utils/response";

export const validateMissingProperties = (
  body: Object,
  resourceName: string,
  getResponse: (body) => Promise<Response>,
  unrequiredBodyProperties?: string[]): void => { //TODO use helper function so recursive call doesn't need to pass so many arguments
  for (const key of Object.keys(body)) {
    if (isObject(body[key]))
      validateMissingProperties(body[key], resourceName, getResponse, unrequiredBodyProperties);

    if (!unrequiredBodyProperties?.includes(key))
      it(`shouldn't post ${resourceName} so ${key} is missing`, async () => {
        const bodyWithMissingKey = { ...body };
        delete bodyWithMissingKey[key];
        const {status} = await getResponse(bodyWithMissingKey);

        expect(status).toBe(HTTP_STATUS.UNPROCESSABLE_ENTITY);
      });
  }
};