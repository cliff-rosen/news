import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, register as apiRegister } from "../Common/AuthAPI";

export const setStoredUser = (user) => {
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
  const user = JSON.stringify({ userID: 0 });
  console.log("user in logout", user);
  localStorage.setItem("user", user);
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

export const getLoginActionObject = () => {
  return {
    show: false,
    message: "",
    mode: null,
    fn: null,
    params: null,
  };
};

export const useUserManager = () => {
  const [user, setUser] = useState(getUser());
  const setUserX = (u) => {
    console.log("App.setUserX", u);
    setStoredUser(u);
    setUser(u);
  };
  const [lao, setLao] = useState(getLoginActionObject(setUserX));
  const navigate = useNavigate();

  const showLogin = (show, message) => {
    setLao({ ...lao, show: show, message });
    if (!show) {
      navigate("/");
    }
  };

  const requireUser = () => {
    if (user.userID === 0 && lao.show === false) {
      showLogin(true, "Please login or register to use this feature.");
    }
  };

  const register = (username, password) => {
    return p_register(username, password).then(() => setUser(getUser()));
  };

  const login = (username, password) => {
    return p_login(username, password).then(() => setUser(getUser()));
  };

  const logout = () => {
    p_logout();
    setUserX({ userID: 0 });
  };

  return [
    {
      user,
      lao,
      setUser: setUserX,
      setLao,
      showLogin,
      register,
      login,
      logout,
      requireUser,
    },
    (x) => x,
  ];
};
