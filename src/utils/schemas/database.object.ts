import { OwnerId } from "./owner.id";

export interface DatabaseObject<Id> {
  id: Id;
  createdAt: number;
  ownerId: OwnerId;
}