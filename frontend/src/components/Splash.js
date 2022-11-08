import { useState } from "react";
import { getAccess } from "../common/AuthAPI";

export default function Splash({ setOkToTrip }) {
  const [password, setPassword] = useState("");
  const [tou, setTou] = useState(false);
  const [message, setMessage] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    if (!tou) {
      setMessage("Please agree to the Terms of Use.");
      return;
    }

    getAccess(password)
      .then((res) => setOkToTrip(true))
      .catch((err) => setMessage("Mmmm, nope."));
  };

  return (
    <div>
      <div>Tripper's Almanac PRE-LAUNCH</div>
      <div>
        <div style={{ fontSize: "10px", width: 500 }}>
          <br />
          <u>Terms of Use</u>
          <br />
          <br />
          All contents of this site are for informational purposes only. Nothing
          on this site is intended to be a substitute for professional medical
          or legal advice. Always seek the advice of qualified medical and legal
          professionals, and never disregard professional advice because of
          something you have seen on this site. The use of this site and its
          contents is at your own risk. This site and its contents are provided
          on an “as is” basis. The owners and operators of this site disclaim
          all warranties including but not limited to the implied warranties of
          merchantability, non-infringement of thid parties’ rights, and fitness
          for particular purpose. In particular, we make no representations or
          warranties about the accuracy, reliability, completeness, currentness
          or timeliness of any of the contents of the site. In no event shall
          the owners and operators of the site be liable for any damages
          whatsoever resulting from the use of the site.
          <br />
          <br />I agree to the Terms of Use.{" "}
          <input
            type="checkbox"
            onChange={(e) => setTou(e.target.value)}
            value={tou}
          />
        </div>

        <div>
          <br />
        </div>
        <form onSubmit={submitForm}>
          <span style={{ fontSize: 14 }}>Password: </span>
          <input
            autoFocus
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <button type="submit">enter</button>
          <br />
          {message}
        </form>
      </div>
    </div>
  );
}
