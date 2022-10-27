import { useState } from "react";
import { login, register, getUser } from "../Common/Auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function LoginFormModal({ user, setUserX }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameR, setUsernameR] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [errMessage, setErrMessage] = useState("");
  //const [open, setOpen] = useState(user?.userID == -99 ? true : false);

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setUsernameR("");
    setPasswordR("");
    setErrMessage("");
    setUserX({ userId: 0 });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    login(username, password)
      .then((res) => {
        setUsername("");
        setPassword("");
        setErrMessage("");
        setUserX(getUser());
      })
      .catch((err) => {
        console.log("formSubmit: ", err.message);
        setErrMessage("Login error: " + err.message);
      });
  };

  const formSubmitR = (e) => {
    e.preventDefault();
    register(usernameR, passwordR)
      .then((res) => {
        setUsernameR("");
        setPasswordR("");
        setErrMessage("");
        setUserX(getUser());
      })
      .catch((err) => setErrMessage("Registration error: " + err.message));
  };

  return (
    <div>
      <Dialog open={user.userID === -99 ? true : false} onClose={handleClose}>
        <DialogTitle>Login / Register</DialogTitle>
        <DialogContent>
          {errMessage ? (
            <span>
              {errMessage} <br />
              <br />
            </span>
          ) : (
            ""
          )}
          <DialogContentText>LOGIN </DialogContentText>
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
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={formSubmit}>
                login
              </Button>
            </DialogActions>
          </form>{" "}
          <DialogContentText>REGISTER</DialogContentText>
          <form>
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
              <Button variant="contained" color="primary" onClick={formSubmitR}>
                register
              </Button>
            </DialogActions>
          </form>{" "}
        </DialogContent>
      </Dialog>
    </div>
  );
}
