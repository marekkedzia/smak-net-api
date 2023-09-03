import { testPutItem } from "../../../tests.schemas/test.put.item";
import { PutItemTestCase } from "../../../tests.schemas/test.cases/put.item.test.case";
import { RoutePermission } from "../../../../src/auth/permission";
import { Resource } from "../../../../src/errors/error.datas";
import { PhotoService } from "../../../../src/modules/photo/photo.service";
import { PhotoRouter } from "../../../../src/modules/photo/photo.router";
import { repositoryMock } from "../../../mocks/repository.mock";
import { PhotoServicePort } from "../../../../src/modules/photo/schemas/photo.service.port";
import { HTTP_STATUS } from "../../../../src/utils/constants/http.statuses";

describe("test put photo handler", () => {
    const testCase: PutItemTestCase = {
      requiredPermission: RoutePermission.PUT_PHOTO,
      path: "/photo",
      resourceName: Resource.FILE,
      validBody: {
        author: "Wuja Marek",
        description: "Najlepsza fotka"
      },
      statusCode: HTTP_STATUS.OK
    };

    const mockPhotoServiceAdapter: PhotoServicePort = {
      providePutFileUrl: jest.fn().mockImplementation(() => "https://aws.s3.com/put")
    };

    const testRouter = new PhotoRouter(new PhotoService(repositoryMock, mockPhotoServiceAdapter));
    testPutItem(testCase, testRouter);
  }
);