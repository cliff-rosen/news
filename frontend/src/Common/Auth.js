import { login as apiLogin, register as apiRegister } from "../Common/AuthAPI";

export const register = async (username, password) => {
  return apiRegister(username, password)
    .then((user) => {
      console.log("registration success", user);
      setUser(user);
      return Promise.resolve("success");
    })
    .catch((e) => {
      console.log("registration error - ", e.message);
      return Promise.reject(e);
    });
};

export const login = async (username, password) => {
  return apiLogin(username, password)
    .then((user) => {
      console.log("Auth.login success", user);
      setUser(user);
      return Promise.resolve("success");
    })
    .catch((e) => {
      console.log("Auth.login error - ", e);
      return Promise.reject(e);
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
