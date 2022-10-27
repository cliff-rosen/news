import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  getUser,
  setStoredUser,
  getLoginActionObject,
  register as authRegister,
  login as authLogin,
  logout as authLogout,
} from "./Common/Auth";
import Nav from "./components/Nav.js";
import PostList from "./components/PostList";
import PostAdd from "./components/PostAdd";
import { Splash } from "./components/Splash";
import LoginFormModal from "./components/LoginFormModal";

function useUserManager() {
  const [user, setUser] = useState(getUser());
  const setUserX = (u) => {
    console.log("App.setUserX", u);
    setStoredUser(u);
    setUser(u);
  };
  const [lao, setLao] = useState(getLoginActionObject(setUserX));
  const navigate = useNavigate();

  const showLogin = (show) => {
    setLao({ ...lao, show: show });
    if (!show) {
      navigate("/");
    }
  };

  const requireUser = () => {
    if (user.userID === 0 && lao.show === false) {
      showLogin(true);
    }
  };

  const register = (username, password) => {
    return authRegister(username, password).then(() => setUser(getUser()));
  };

  const login = (username, password) => {
    return authLogin(username, password).then(() => setUser(getUser()));
  };

  const logout = () => {
    authLogout();
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
}

function App() {
  const [userManager, setUserManager] = useUserManager();
  const [okToTrip, setOkToTrip] = useState(false);

  console.log(userManager);
  if (0 && !okToTrip) {
    return <Splash setOkToTrip={setOkToTrip} />;
  }

  return (
    <>
      <LoginFormModal userManager={userManager} />
      <Nav userManager={userManager} />
      <Routes>
        <Route path="/" element={<PostList user={userManager.user} />} />
        <Route path="add" element={<PostAdd userManager={userManager} />} />
      </Routes>
    </>
  );
}

export default App;
