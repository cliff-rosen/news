import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSessionManager } from "./common/Auth";
import Splash from "./components/Splash";
import Nav from "./components/Nav.js";
import SessionMessage from "./components/SessionMessage";
import LoginFormModal from "./components/LoginFormModal";
import PostList from "./components/PostList";
import PostAdd from "./components/PostAdd";
import PostView from "./components/PostView";
import Help from "./components/Help";
import Trial from "./components/Trial";
import Container from "@mui/material/Container";

function App() {
  const sessionManager = useSessionManager();
  const [okToTrip, setOkToTrip] = useState(false);

  if (process.env.NODE_ENV !== "development" && !okToTrip) {
    return <Splash setOkToTrip={setOkToTrip} />;
  }

  return (
    <div style={{ margin: "auto", border: "none", maxWidth: 800 }}>
      <SessionMessage sessionManager={sessionManager} />
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
          path="/post/:postid"
          element={<PostView sessionManager={sessionManager} />}
        />
        <Route path="/help" element={<Help />} />
        <Route path="/trial/*" element={<Trial />} />
      </Routes>
    </div>
  );
}

export default App;
