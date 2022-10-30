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
