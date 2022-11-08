import { fetchGet, fetchPost } from "./APIUtils";

export const logPostClick = async (entryID) => {
  return fetchGet(`entries/${entryID}/logclick`);
};

export const getPost = async (entryID) => {
  return fetchGet(`entries/${entryID}`);
};

export const getPosts = async (order, start, limit) => {
  order = order || "trending";
  start = start || 0;

  return fetchGet(`entries?order=${order}&start=${start}&limit=${limit}`);
};

export const addPost = async (entryUrl, entryTitle, entryText) => {
  entryUrl = entryUrl.trim();
  entryTitle = entryTitle.trim();
  entryText = entryText.trim();

  const body = {
    entryUrl,
    entryTitle,
    entryText,
  };

  return fetchPost("entries", body);
};

export const setPostVote = async (entryID, vote) => {
  return fetchPost(`entries/${entryID}/vote/${vote}`);
};
