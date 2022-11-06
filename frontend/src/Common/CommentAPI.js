import { fetchGet, fetchPost } from "./APIUtils";

export const getComments = async (entryID) => {
  return await fetchGet(`entries/${entryID}/comments`);
};

export const addComment = async (entryID, parentCommentID, commentText) => {
  commentText = commentText.trim();
  const body = JSON.stringify({
    parentCommentID,
    commentText,
  });

  return await fetchPost(`entries/${entryID}/comments`, body);
};

export const setCommentVote = async (commentID, vote) => {
  return await fetchPost(`entries/comments/${commentID}/vote/${vote}`);
};
