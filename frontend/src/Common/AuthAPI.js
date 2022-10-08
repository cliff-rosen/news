import { BASE_API_URL } from "./APIUtils";

/*

    API RESULT      JSON                STATUS  LOGIN RESULT
    success         {userID, token}     200     JSON
    invalid                                     
    bad request                                 EXCEPTION
    fetch error                                 EXCEPTION

*/

export const login = async (username, password) => {
  const body = JSON.stringify({ username, password });
  const res = await fetch(`${BASE_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (res.status !== 200 || res?.error) throw new Error("Login api error");

  return res.json();
};
