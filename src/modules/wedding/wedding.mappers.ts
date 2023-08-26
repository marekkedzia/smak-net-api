import { Wedding, WeddingListElement } from "./schemas/wedding";

export const mapWedding = ({ id, createdAt, credentials, state, ownerId }): Wedding => ({
  id,
  createdAt,
  credentials,
  state,
  ownerId
});

export const mapWeddingToListElement = ({ id, createdAt, state }): WeddingListElement => ({
  id,
  createdAt,
  state,
});