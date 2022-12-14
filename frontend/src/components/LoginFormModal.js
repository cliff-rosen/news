import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export default function LoginFormModal({ sessionManager }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameR, setUsernameR] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [passwordR2, setPasswordR2] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setUsernameR("");
    setPasswordR("");
    setPasswordR2("");
    setErrMessage("");

    if (sessionManager.lao.homeOnAbort) {
      navigate("/");
    }
    sessionManager.hideLogin();
  };

  const isUsernameValid = (u) => {
    if (u.length < 2 || u.length > 15) {
      return false;
    }

    var usernameRegex = /^[a-zA-Z0-9]+$/;
    return u.match(usernameRegex);
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setErrMessage("Please enter both fields.");
      return;
    }

    if (!isUsernameValid(username)) {
      setErrMessage(
        "Username may contain only letters and numbers and must be between 2 and 12 characters."
      );
      return;
    }

    sessionManager
      .login(username, password)
      .then((u) => {
        setUsername("");
        setPassword("");
        setErrMessage("");
        sessionManager.hideLoginThen(u);
        sessionManager.setSessionMessageWrapper("Login successful");
      })
      .catch((err) => {
        console.log("formSubmit: ", err.message);
        if (err.message === "UNAUTHORIZED") {
          setErrMessage("Invalid login.  Please try again.");
        } else {
          setErrMessage(
            "Sorry, an unexpected error occurred.  Please try again."
          );
        }
      });
  };

  const formSubmitR = (e) => {
    e.preventDefault();

    if (usernameR === "" || passwordR === "" || passwordR2 === "") {
      setErrMessage("Please enter all fields.");
      return;
    }

    if (!isUsernameValid(usernameR)) {
      setErrMessage(
        "Username must be between 2 and 12 characters and may contain only letters and numbers."
      );
      return;
    }

    if (passwordR !== passwordR2) {
      setErrMessage("The passwords do not match.");
      return;
    }

    sessionManager
      .register(usernameR, passwordR)
      .then((u) => {
        setUsernameR("");
        setPasswordR("");
        setPasswordR2("");
        setErrMessage("");
        sessionManager.hideLoginThen(u);
        sessionManager.setSessionMessageWrapper("Registration successful");
      })
      .catch((err) => {
        if ((err.message = "DUPLICATE")) {
          setErrMessage(
            "Sorry, that username is already in use.  Please select another."
          );
        } else {
          setErrMessage("Registration error: " + err.message);
        }
      });
  };

  return (
    <Dialog
      open={sessionManager.lao.show}
      onClose={handleClose}
      PaperProps={{ sx: { width: 350 } }}
    >
      <DialogTitle>Login / Register</DialogTitle>
      <DialogContent>
        {sessionManager.lao.message && (
          <DialogContentText>
            {sessionManager.lao.message}
            <br /> <br />
          </DialogContentText>
        )}
        {errMessage ? (
          <Alert severity="error">
            {errMessage} <br />
            <br />
          </Alert>
        ) : (
          ""
        )}
        <DialogContentText>LOGIN </DialogContentText>
        <Box component="form" onSubmit={formSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            id="username"
            fullWidth
            autoFocus
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            required
          />
          <br />
          <TextField
            margin="normal"
            id="password"
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            required
          />
          <br />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              login
            </Button>
          </DialogActions>
        </Box>{" "}
        <DialogContentText>REGISTER</DialogContentText>
        <form onSubmit={formSubmitR}>
          <TextField
            margin="normal"
            id="usernameR"
            fullWidth
            type="text"
            label="Username"
            value={usernameR}
            onChange={(e) => setUsernameR(e.target.value)}
            variant="outlined"
            required
          />
          <br />
          <TextField
            margin="normal"
            id="passwordR"
            fullWidth
            type="password"
            label="Password"
            value={passwordR}
            onChange={(e) => setPasswordR(e.target.value)}
            variant="outlined"
            required
          />
          <br />
          <TextField
            margin="normal"
            id="password2R"
            fullWidth
            type="password"
            label="Password (repeat)"
            value={passwordR2}
            onChange={(e) => setPasswordR2(e.target.value)}
            variant="outlined"
            required
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
  );
}
