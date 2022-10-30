import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function LoginFormModal({ userManager }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameR, setUsernameR] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setUsernameR("");
    setPasswordR("");
    setErrMessage("");
    if (userManager.lao.homeOnAbort) {
      navigate("/");
    }
    userManager.hideLogin();
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setErrMessage("Please enter both fields.");
      return;
    }

    userManager
      .login(username, password)
      .then((u) => {
        setUsername("");
        setPassword("");
        setErrMessage("");
        userManager.hideLoginThen(u);
      })
      .catch((err) => {
        console.log("formSubmit: ", err.message);
        setErrMessage("Login error: " + err.message);
      });
  };

  const formSubmitR = (e) => {
    e.preventDefault();

    if (usernameR === "" || passwordR === "") {
      setErrMessage("Please enter both fields.");
      return;
    }

    userManager
      .register(usernameR, passwordR)
      .then((u) => {
        setUsernameR("");
        setPasswordR("");
        setErrMessage("");
        userManager.hideLoginThen(u);
      })
      .catch((err) => setErrMessage("Registration error: " + err.message));
  };

  return (
    <div>
      <Dialog open={userManager.lao.show} onClose={handleClose}>
        <DialogTitle>Login / Register</DialogTitle>
        <DialogContent>
          {userManager.lao.message && (
            <DialogContentText>
              {userManager.lao.message}
              <br /> <br />
            </DialogContentText>
          )}
          {errMessage ? (
            <span>
              {errMessage} <br />
              <br />
            </span>
          ) : (
            ""
          )}
          <DialogContentText>LOGIN </DialogContentText>
          <form onSubmit={formSubmit}>
            <TextField
              id="username"
              style={{ width: "400px", margin: "5px" }}
              autoFocus
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
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                login
              </Button>
            </DialogActions>
          </form>{" "}
          <DialogContentText>REGISTER</DialogContentText>
          <form onSubmit={formSubmitR}>
            <TextField
              id="usernameR"
              style={{ width: "400px", margin: "5px" }}
              type="text"
              label="Username"
              value={usernameR}
              onChange={(e) => setUsernameR(e.target.value)}
              variant="outlined"
            />
            <br />
            <TextField
              id="passwordR"
              style={{ width: "400px", margin: "5px" }}
              type="password"
              label="Password"
              value={passwordR}
              onChange={(e) => setPasswordR(e.target.value)}
              variant="outlined"
            />
            <br />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                register
              </Button>
            </DialogActions>
          </form>{" "}
        </DialogContent>
      </Dialog>
    </div>
  );
}
