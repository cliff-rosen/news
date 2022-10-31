import { useState } from "react";
import { getAccess } from "../common/AuthAPI";

export default function Splash({ setOkToTrip }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    getAccess(password)
      .then((res) => setOkToTrip(true))
      .catch((err) => setMessage("Mmmm, nope."));
  };

  return (
    <div>
      <div>Tripper's Almanac</div>
      <div>
        <form onSubmit={submitForm}>
          <input
            autoFocus
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">enter</button>
          {message}
        </form>
      </div>
    </div>
  );
}
