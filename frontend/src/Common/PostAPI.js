import { BASE_API_URL } from "./APIUtils";
import { getUserToken } from "./Auth";

export const getPosts = async () => {
  let data = {};
  try {
    const res = await fetch(`${BASE_API_URL}/entries`, {
      headers: { Authorization: "abc" },
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
