import { useState } from "react";
import { login, register, getUser } from "../Common/Auth";
import { TextField, Button } from "@mui/material";
import { Container } from "@mui/system";
import styled from "@emotion/styled";

const LayoutContainer = styled(Container)(() => ({
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

export function LoginForm({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameR, setUsernameR] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    login(username, password)
      .then((res) => setUser(getUser()))
      .catch((err) => {
        console.log("formSubmit: ", err.message);
        setErrMessage("Login error: " + err.message);
      });
  };

  const formSubmitR = (e) => {
    e.preventDefault();
    register(usernameR, passwordR)
      .then((res) => setUser(getUser()))
      .catch((err) => setErrMessage("Registration error: " + err.message));
  };

  return (
    <LayoutContainer>
      <br />
      {errMessage}
      <br />
      <br />
      LOGIN
      <form>
        <TextField
          id="username"
          style={{ width: "400px", margin: "5px" }}
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
        />
        <br />
        <TextField
          id="password"
          style={{ width: "400px", margin: "5px" }}
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
        />
        <br />
        <Button variant="contained" color="primary" onClick={formSubmit}>
          login
        </Button>
      </form>
      <br />
      <br />
      REGISTER
      <form>
        <TextField
          id="username"
          style={{ width: "400px", margin: "5px" }}
          type="text"
          label="Username"
          value={usernameR}
          onChange={(e) => setUsernameR(e.target.value)}
          variant="outlined"
        />
        <br />
        <TextField
          id="password"
          style={{ width: "400px", margin: "5px" }}
          type="password"
          label="Password"
          value={passwordR}
          onChange={(e) => setPasswordR(e.target.value)}
          variant="outlined"
        />
        <br />
        <Button variant="contained" color="primary" onClick={formSubmitR}>
          register
        </Button>
      </form>
    </LayoutContainer>
  );
}
