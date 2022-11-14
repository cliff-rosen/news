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

export const addPost = async (
  entryUrl,
  entryTitle,
  entryText,
  iSubstances,
  iConditions
) => {
  entryUrl = entryUrl.trim();
  entryTitle = entryTitle.trim();
  entryText = entryText.trim();
  const substances = [];
  const conditions = [];

  for (const [key, value] of Object.entries(iSubstances)) {
    if (value) substances.push(key);
  }

  for (const [key, value] of Object.entries(iConditions)) {
    if (value) conditions.push(key);
  }

  const body = {
    entryUrl,
    entryTitle,
    entryText,
    substances,
    conditions,
  };

  return fetchPost("entries", body);
};

export const setPostVote = async (entryID, vote) => {
  return fetchPost(`entries/${entryID}/vote/${vote}`);
};

export const addFeedback = async (feedbackText) => {
  feedbackText = feedbackText.trim();

  const body = {
    feedbackText,
  };

  return fetchPost("feedback", body);
};
