import { HTTP_STATUS } from "../../../src/utils/constants/http.statuses";
import { isArray, isObject } from "./check.type";
import { Response } from "../../utils/response";

export const validateWrongTypes = (body: Object, resourceName: string, getResponse: (body) => Promise<Response>): void => {
  const wrongStringType = "wrongType";
  const wrongObjectType = { wrongType: "wrongType" };

  for (const key of Object.keys(body)) {
    if (isObject(body[key]))
      validateWrongTypes(body[key], resourceName, getResponse); //TODO use helper function so recursive call doesn't need to pass so many arguments

    it(`shouldn't post ${resourceName} so ${key} is wrong type`, async () => {
      const bodyWithWrongType = { ...body };
      bodyWithWrongType[key] = isObject(body[key]) || isArray(body[key]) ? wrongStringType : wrongObjectType;
      const { status } = await getResponse(bodyWithWrongType);

      expect(status).toBe(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    });
  }
};