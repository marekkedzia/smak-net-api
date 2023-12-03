import { GetItemTestCase } from "../../../tests.schemas/test.cases/get.item.test.case";
import { FileId, FileInfo } from "../../../../src/modules/file/file.interfaces";
import { Resource } from "../../../../src/utils/constants/resources.names";
import { Permission } from "../../../../src/auth/permission";
import { testGetItemList } from "../../../tests.schemas/test.get.items.list";
import { fileRouter } from "../../../../src/context/file.context";
import { FileKey } from "../../../../src/modules/file/file.interfaces";
import { OwnerId } from "../../../../src/utils/schemas/owner.id";
import { DateUtils } from "../../../../src/utils/date.utils";
import { Mongo } from "../../../../src/db/mongo";

describe("test get resource files endpoint", () => {
    const resourceId = "resourceId";
    const sourceFilesInfo: FileInfo[] = [
      {
        filename: "filename",
        encoding: "encoding",
        mimeType: "mimeType",
        key: "key" as FileKey,
        resourceId: "resourceId",
        id: "id" as FileId,
        ownerId: "ownerId" as OwnerId,
        createdAt: DateUtils.getDateNow()
      }
    ];

    Mongo.files = jest.fn().mockReturnValue({
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockReturnValue(sourceFilesInfo)
      })
    });

    const testCase: GetItemTestCase<FileInfo[], FileInfo[]> = {
      path: `/file/resource/${resourceId}`,
      resourceName: Resource.FILE,
      requiredPermission: Permission.GET_FILE,
      source: sourceFilesInfo,
      expected: sourceFilesInfo
    };

    testGetItemList(testCase, fileRouter);
  }
);