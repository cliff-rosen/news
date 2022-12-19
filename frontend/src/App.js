import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSessionManager } from "./utils/Auth";
import { getExpiringLocalStorageItem } from "./utils/MiscUtils";
import Splash from "./components/Splash";
import Nav from "./components/Nav.js";
import SessionMessage from "./components/SessionMessage";
import LoginFormModal from "./components/LoginFormModal";
import PostList from "./components/PostList";
import PostAdd from "./components/PostAdd";
import PostView from "./components/PostView";
import Profile from "./components/Profile";
import Help from "./components/Help";
import Trial from "./components/Trial";
import Container from "@mui/material/Container";

function App() {
  const sessionManager = useSessionManager();
  const [okToTrip, setOkToTrip] = useState(
    getExpiringLocalStorageItem("termsAccepted")
  );

  if (!okToTrip) {
    return <Splash setOkToTrip={setOkToTrip} />;
  }

  return (
    <Container disableGutters style={{ maxWidth: 800 }}>
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
          path="/add"
          element={<PostAdd sessionManager={sessionManager} />}
        />
        <Route
          path="/post/:postid"
          element={<PostView sessionManager={sessionManager} />}
        />
        <Route
          path="/profile"
          element={<Profile sessionManager={sessionManager} />}
        />

        <Route path="/help" element={<Help />} />
        <Route path="/trial/*" element={<Trial />} />
      </Routes>
    </Container>
  );
}

export default App;
