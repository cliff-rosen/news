import { useState } from "react";
import { login as apiLogin, register as apiRegister } from "../Common/AuthAPI";

const setStoredUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const p_register = async (username, password) => {
  return apiRegister(username, password)
    .then((user) => {
      console.log("Auth.register success", user);
      setStoredUser(user);
      return Promise.resolve("success");
    })
    .catch((e) => {
      console.log("Auth.register error - ", e.message);
      return Promise.reject(e);
    });
};

const p_login = async (username, password) => {
  return apiLogin(username, password)
    .then((user) => {
      console.log("Auth.login success", user);
      setStoredUser(user);
      return Promise.resolve("success");
    })
    .catch((e) => {
      console.log("Auth.login error - ", e);
      return Promise.reject(e);
    });
};

const p_logout = () => {
  setStoredUser({ userID: 0 });
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

export const getUserToken = () => {
  var user;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = { userID: -1, token: "" };
  }
  return "Bearer " + user.token;
};

const makeLoginActionObject = () => {
  return {
    show: false,
    message: "",
    mode: null,
    fn: null,
    params: null,
    homeOnAbort: false,
  };
};

export const useUserManager = () => {
  const [user, setUser] = useState(getUser());
  const [lao, setLao] = useState(makeLoginActionObject());

  const showLogin = (message) => {
    setLao({ ...lao, show: true, message });
  };

  const hideLogin = () => {
    setLao(makeLoginActionObject());
  };

  const requireUser = () => {
    if (user.userID === 0 && lao.show === false) {
      showLogin("Please login or register to use this feature.");
      setLao((curLao) => {
        return { ...curLao, homeOnAbort: true };
      });
    }
  };

  const register = async (username, password) => {
    await p_register(username, password);
    setUser(getUser());
  };

  const login = async (username, password) => {
    await p_login(username, password);
    setUser(getUser());
  };

  const logout = () => {
    p_logout();
    setUser(getUser());
  };

  return [
    {
      user,
      lao,
      setLao,
      showLogin,
      hideLogin,
      register,
      login,
      logout,
      requireUser,
    },
    (x) => x,
  ];
};
