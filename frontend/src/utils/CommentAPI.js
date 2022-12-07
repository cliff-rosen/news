import { fetchGet, fetchPost, fetchPut } from "./APIUtils";

export const getComments = async (entryID) => {
  return await fetchGet(`entries/${entryID}/comments`);
};

export const addComment = async (entryID, parentCommentID, commentText) => {
  commentText = commentText.trim();
  const body = {
    parentCommentID,
    commentText,
  };

  return await fetchPost(`entries/${entryID}/comments`, body);
};

export const updateComment = async (entryID, commentID, commentText) => {
  commentText = commentText.trim();
  const body = {
    commentID,
    commentText,
  };

  return await fetchPut(`entries/${entryID}/comments`, body);
};

export const setCommentVote = async (commentID, vote) => {
  return await fetchPost(`entries/comments/${commentID}/vote/${vote}`);
};
