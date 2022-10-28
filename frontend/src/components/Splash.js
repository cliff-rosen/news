import React, { useState } from "react";
import { getAccess } from "../Common/AuthAPI";

export function Splash({ setOkToTrip }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const clickHandler = () => {
    getAccess(password)
      .then((res) => setOkToTrip(true))
      .catch((err) => setMessage("Mmmm, nope."));
  };

  return (
    <div>
      <div>Tripper's Almanac</div>
      <div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={clickHandler}>enter</button>
        {message}
      </div>
    </div>
  );
}
