import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Feedback from "./Feedback";

function X() {
  console.log("X");
  return <div>X</div>;
}

export default function Trial(props) {
  const [count, setCount] = useState(0);

  const submitForm = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };
  return (
    <div>
      Trial
      <Routes>
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
}
