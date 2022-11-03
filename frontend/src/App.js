import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSessionManager } from "./common/Auth";
import Splash from "./components/Splash";
import Nav from "./components/Nav.js";
import LoginFormModal from "./components/LoginFormModal";
import PostList from "./components/PostList";
import PostAdd from "./components/PostAdd";
import Post from "./components/Post";
import Trial from "./components/Trial";

function App() {
  const sessionManager = useSessionManager();
  const [okToTrip, setOkToTrip] = useState(false);

  if (false && !okToTrip) {
    return <Splash setOkToTrip={setOkToTrip} />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div style={{ flexGrow: 1, border: "none", maxWidth: 800 }}>
        <LoginFormModal sessionManager={sessionManager} />
        <Nav sessionManager={sessionManager} />
        <Routes>
          <Route
            path="/"
            element={<PostList sessionManager={sessionManager} />}
          />
          <Route
            path="/postlist"
            element={<PostList sessionManager={sessionManager} />}
          />
          <Route
            path="add"
            element={<PostAdd sessionManager={sessionManager} />}
          />
          <Route
            path="post/:postid"
            element={<Post sessionManager={sessionManager} />}
          />
          <Route path="trial" element={<Trial />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
