import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ sessionManager }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionManager.user.userID) {
      navigate("/");
    }
  }, [sessionManager.user.userID]);

  return sessionManager.user.userName;
}
