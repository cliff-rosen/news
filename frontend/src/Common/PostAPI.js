import { BASE_API_URL } from "./APIUtils";
import { getUserToken } from "./Auth";

export const getPosts = async () => {
  let data = {};
  try {
    const res = await fetch(`${BASE_API_URL}/entries`, {
      headers: {
        method: "GET",
        "Content-Type": "application/json",
        Authorization: getUserToken(),
      },
    });
    if (res.status !== 200) throw new Error("getPosts http error");
    data = await res.json();
  } catch (e) {
    console.log("getPostsError", e);
    throw e;
  }
  return data;
};

export const addPost = async (body) => {
  const res = await fetch(`${BASE_API_URL}/entry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserToken(),
    },
    body,
  });
  console.log("api add result", res.status);
  if (res.status !== 200) throw new Error("Add post error");
};

export const addPostVote = async (body) => {
  const res = await fetch(`${BASE_API_URL}/user_entry_vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserToken(),
    },
    body,
  });
  console.log("api addPostVote result", res.status);
  if (res.status !== 200) throw new Error("Add post vote error");
};

export const editPostVote = async (body) => {
  const res = await fetch(`${BASE_API_URL}/user_entry_vote`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserToken(),
    },
    body,
  });
  console.log("api editPostVote result", res.status);
  if (res.status !== 200) throw new Error("Add post vote error");
};
