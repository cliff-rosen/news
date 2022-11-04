import { fetchGet, fetchPost } from "./APIUtils";

export const getComments = async (entryID) => {
  return await fetchGet(`entries/${entryID}/comments`);
};

export const addComment = async (entryID, parentCommentID, commentText) => {
  const body = JSON.stringify({
    parentCommentID,
    commentText,
  });

  return await fetchPost(`entries/${entryID}/comments`, body);
};
