import { config } from "../conf";
import { getUserToken } from "./Auth";

export const BASE_API_URL = config.url.API_URL;

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: getUserToken(),
  };
}

/*
    doFetch(method, endpoint, [body])
    returns json from API endpoint
    throws error if:
        fetch status !== 200
        fetch doesn't return parsable json
        parsed json includes "error" property
*/
async function doFetch(method, endpoint, body) {
  if (method !== "GET" && method !== "POST") {
    throw new Error("doFetch called with invalid method:" + method);
  }

  const headers = getHeaders();
  const options = {
    method,
    headers,
  };
  if (body) {
    options.body = body;
  }

  const res = await fetch(`${BASE_API_URL}/${endpoint}`, options);
  const data = await res.json();

  if (res.status !== 200 || data.error) {
    throw new Error(
      `doFetch error. [status=${res.status}, error=${data?.error}]`
    );
  }

  return data;
}

export async function fetchGet(endpoint) {
  console.log("fetchGet", endpoint);
  return doFetch("GET", endpoint);
}

export async function fetchPost(endpoint, body) {
  console.log("fetchPost", endpoint);
  return doFetch("POST", endpoint, body);
}
