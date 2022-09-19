import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.js";
import PostList from "./components/PostList";
import PostAdd from "./components/PostAdd";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="add" element={<PostAdd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
