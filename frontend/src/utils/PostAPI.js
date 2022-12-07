import { fetchGet, fetchPost, fetchPut } from "./APIUtils";

export const logPostClick = async (entryID) => {
  return fetchPost(`entries/${entryID}/logclick`);
};

export const getPost = async (entryID) => {
  return fetchGet(`entries/${entryID}`);
};

export const getPostByUrl = async (url) => {
  return fetchGet(`entries/url/${encodeURIComponent(url)}`);
};

export const getPosts = async (
  order,
  start,
  limit,
  entryTypeIDs,
  substanceIDs,
  conditionIDs
) => {
  order = order || "trending";
  start = start || 0;
  return fetchGet(
    `entries?order=${order}&start=${start}&limit=${limit}&entrytypeids=${entryTypeIDs}&substanceids=${substanceIDs}&conditionids=${conditionIDs}`
  );
};

export const addPost = async (
  entryTypeID,
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
    entryTypeID,
    entryUrl,
    entryTitle,
    entryText,
    substances,
    conditions,
  };

  return fetchPost("entries", body);
};

export const editPost = async (
  entryID,
  entryTypeID,
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
    entryTypeID,
    entryUrl,
    entryTitle,
    entryText,
    substances,
    conditions,
  };

  return fetchPut(`entries/${entryID}`, body);
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
