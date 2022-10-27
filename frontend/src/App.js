import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUser, setStoredUser } from "./Common/Auth";
import Nav from "./components/Nav.js";
import PostList from "./components/PostList";
import PostAdd from "./components/PostAdd";
import { Splash } from "./components/Splash";
import LoginFormModal from "./components/LoginFormModal";

function App() {
  const [user, setUser] = useState(getUser());
  const [okToTrip, setOkToTrip] = useState(false);

  const setUserX = (u) => {
    console.log("App.setUserX", u);
    setStoredUser(u);
    setUser(u);
  };

  if (!okToTrip) {
    return <Splash setOkToTrip={setOkToTrip} />;
  }

  return (
    <BrowserRouter>
      <LoginFormModal user={user} setUserX={setUserX} />
      <Nav user={user} setUserX={setUserX} />
      <Routes>
        <Route path="/" element={<PostList user={user} />} />
        <Route
          path="add"
          element={<PostAdd user={user} setUserX={setUserX} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
