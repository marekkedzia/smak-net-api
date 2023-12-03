import { Response } from "../utils/response";
import { HTTP_STATUS } from "../../src/utils/constants/http.statuses";

export const validateQuery = (validKey: string) => (obtainResponse: (path: string) => Promise<Response>) => {
  it(`shouldn't get so ${validKey} is wrong type`, async () => {
      const { status } = await obtainResponse(`?${validKey}=invalid-value`);

      expect(status).toBe(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    }
  );
};