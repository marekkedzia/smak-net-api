import { OwnerId } from "./owner.id";

export interface DatabaseObject<Id, Credentials> {
  id: Id;
  createdAt: number;
  ownerId: OwnerId;
  credentials: Credentials;
}