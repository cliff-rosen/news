import { login as apiLogin } from "../Common/AuthAPI";

export const registerUser = (username, password) => {
  const user = { userID: 12345 };
  localStorage.setItem("user", JSON.stringify(user));
};

export const login = (username, password) => {
  username = "john";
  password = "abc";
  return apiLogin(username, password)
    .then((user) => {
      console.log("login success", user);
      setUser(user);
      return Promise.resolve("success");
    })
    .catch((e) => {
      console.log("login error", e);
      throw new Error("login error");
    });
};

export const logout = () => {
  const user = JSON.stringify({ userID: 0 });
  console.log("user in logout", user);
  localStorage.setItem("user", user);
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  let user = { userID: 0 };

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = { userID: -1 };
  }

  return user;
};
