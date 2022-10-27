import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useUserManager } from "./Common/Auth";
import Nav from "./components/Nav.js";
import PostList from "./components/PostList";
import PostAdd from "./components/PostAdd";
import { Splash } from "./components/Splash";
import LoginFormModal from "./components/LoginFormModal";

function App() {
  const [userManager, setUserManager] = useUserManager();
  const [okToTrip, setOkToTrip] = useState(false);

  console.log(userManager);
  if (!okToTrip) {
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
