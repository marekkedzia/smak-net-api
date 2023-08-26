import { Repository } from "../../src/utils/schemas/repository";

export const repositoryMock: Repository<any> = {
  insertOne: jest.fn(),
  findOne: jest.fn(),
  findMany: jest.fn(),
  findOneAndUpdate: jest.fn(),
  updateOne: jest.fn()
}