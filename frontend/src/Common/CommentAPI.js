import { BASE_API_URL } from "./APIUtils";
import { getUserToken } from "./Auth";

export const getComments = async (entryID) => {
  const res = await fetch(`${BASE_API_URL}/comments/${entryID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserToken(),
    },
  });

  console.log("api getComments result", res.status);
  if (res.status !== 200) throw new Error("Post not found");
  const data = await res.json();
  return data;
};

export const addComment = async (entryID, parentCommentID, commentText) => {
  const body = JSON.stringify({
    entryID,
    parentCommentID,
    commentText,
  });

  const res = await fetch(`${BASE_API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserToken(),
    },
    body,
  });

  const status = res.status;
  const data = await res.json();

  console.log("api add result", res.status, data);
  if (status !== 200 || data.error) {
    throw new Error("API error");
  }
};
