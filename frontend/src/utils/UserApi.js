import { fetchGet, fetchPost, fetchPut } from "./APIUtils";

export const getUser = async (userID) => {
  return fetchGet(`users/${userID}`);
};
