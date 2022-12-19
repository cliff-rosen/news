import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser as apiGetUser } from "../utils/UserApi";

export default function Profile({ sessionManager }) {
  const [user, setUser] = useState({});
  const [fetchError, setFetchError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionManager.user.userID) {
      navigate("/");
    }

    const getUser = async () => {
      try {
        const res = await apiGetUser(sessionManager.user.userID);
        setUser(res);
      } catch (error) {}
    };

    getUser();
  }, [sessionManager.user.userID]);

  if (fetchError) {
    return <div>Doh! An error occurred. Please refresh page.</div>;
  }

  return (
    <div>
      <br />
      <div style={{ display: "flex", flexDirection: "row", width: 200 }}>
        <div style={{ width: "50%" }}>username:</div>
        <div style={{ width: "50%" }}>{user.UserName}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", width: 200 }}>
        <div style={{ width: "50%" }}>created:</div>
        <div style={{ width: "50%" }}>
          {user.DateTimeCreated ? user.DateTimeCreated.substring(0, 10) : ""}
        </div>
      </div>
    </div>
  );
}
