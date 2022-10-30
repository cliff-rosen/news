import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useUserManager } from "./Common/Auth";
import Splash from "./components/Splash";
import Nav from "./components/Nav.js";
import LoginFormModal from "./components/LoginFormModal";
import PostList from "./components/PostList";
import PostAdd from "./components/PostAdd";
import Post from "./components/Post";
import Trial from "./components/Trial";

function App() {
  const [userManager, setUserManager] = useUserManager();
  const [okToTrip, setOkToTrip] = useState(false);

  if (false && !okToTrip) {
    return <Splash setOkToTrip={setOkToTrip} />;
  }

  return (
    <>
      <LoginFormModal userManager={userManager} />
      <Nav userManager={userManager} />
      <Routes>
        <Route
          path="/"
          element={<PostList userManager={userManager} order={"trending"} />}
        />
        <Route
          path="/new"
          element={<PostList userManager={userManager} order={"new"} />}
        />
        <Route path="add" element={<PostAdd userManager={userManager} />} />
        <Route
          path="post/:postid"
          element={<Post userManager={userManager} />}
        />
        <Route path="trial" element={<Trial />} />
      </Routes>
    </>
  );
}

export default App;
