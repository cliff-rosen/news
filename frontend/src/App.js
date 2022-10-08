import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUser } from "./Common/Auth";
import Nav from "./components/Nav.js";
import PostList from "./components/PostList";
import PostAdd from "./components/PostAdd";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <BrowserRouter>
      <Nav user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<PostList user={user} />} />
        <Route path="add" element={<PostAdd user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
