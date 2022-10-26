import { BASE_API_URL } from "./APIUtils";

export const getAccess = async (password) => {
  const body = JSON.stringify({ password });
  const res = await fetch(`${BASE_API_URL}/access`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (res.status === 200) {
    return "ok";
  } else if (res.status === 401) {
    console.log("AuthAPI.login - 401");
    throw new Error("INVALID_LOGIN");
  } else if (res?.error) {
    throw new Error(res.error);
  } else {
    throw new Error("UNKNOWN_LOGIN_ERROR");
  }
};

export const register = async (username, password) => {
  const body = JSON.stringify({ username, password });
  const res = await fetch(`${BASE_API_URL}/createuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const user = await res.json();
  if (res.status === 200 && !user.error) {
    return user;
  } else if (user.error) {
    throw new Error(user.error);
  } else {
    throw new Error("UNKNOWN_REGISTRATION_ERROR");
  }
};

/*

    API RESULT      JSON                STATUS  LOGIN RESULT
    success         {userID, token}     200     JSON
    invalid                             401     EXCEPTION INVALID_LOGIN                     
    fetch error                                 EXCEPTION res.error
    unknown error                               EXCEPTION UNKNOWN_LOGIN_ERROR
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

  if (res.status === 200) {
    return res.json();
  } else if (res.status === 401) {
    console.log("AuthAPI.login - 401");
    throw new Error("INVALID_LOGIN");
  } else if (res?.error) {
    throw new Error(res.error);
  } else {
    throw new Error("UNKNOWN_LOGIN_ERROR");
  }
};
