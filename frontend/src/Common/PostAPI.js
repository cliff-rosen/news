import { BASE_API_URL } from "./APIUtils";
import { getUserToken } from "./Auth";

export const getPost = async (entryID) => {
  const res = await fetch(`${BASE_API_URL}/entries/${entryID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserToken(),
    },
  });

  console.log("api getPost result", res.status);
  if (res.status !== 200) throw new Error("Post not found");

  const data = await res.json();
  return data;
};

export const getPosts = async (order, start, limit) => {
  start = start || 0;
  let data = {};
  try {
    const res = await fetch(
      `${BASE_API_URL}/entries?order=${order}&start=${start}&limit=${limit}`,
      {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          Authorization: getUserToken(),
        },
      }
    );
    const status = res.status;
    data = await res.json();
    if (status !== 200 || data.error) throw new Error("getPosts http error");
  } catch (e) {
    console.log("API ERROR in getPosts:", e.message);
    throw e;
  }
  return data;
};

export const addPost = async (entryUrl, entryTitle, entryText) => {
  const body = JSON.stringify({
    entryUrl,
    entryTitle,
    entryText,
  });

  const res = await fetch(`${BASE_API_URL}/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserToken(),
    },
    body,
  });

  console.log("api add result", res.status);
  const data = await res.json();

  if (res.status !== 200 || data.error) throw new Error("Add post error");
};

export const setPostVote = async (entryID, vote) => {
  const res = await fetch(`${BASE_API_URL}/entries/${entryID}/vote/${vote}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserToken(),
    },
  });
  console.log("api setPostVote result", res.status);
  if (res.status !== 200) throw new Error("Add post vote error");
};
