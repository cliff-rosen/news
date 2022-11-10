import * as React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Trial(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <Dialog
      open={true}
      onClose={(x) => x}
      PaperProps={{ sx: { minWidth: 300 } }}
    >
      <DialogTitle>Login / Register</DialogTitle>
      <DialogContent
        style={{
          minWidth: 250,
          border: "solid",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DialogContentText>LOGIN </DialogContentText>
        <form
          onSubmit={submitForm}
          style={{ width: { xs: 100, md: 400 }, border: "dashed" }}
        >
          <TextField
            id="username"
            sx={{ width: { xs: 100, md: 400 }, margin: "5px" }}
            autoFocus
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            required
          />
          <br />
          <DialogActions style={{ border: "solid" }}>
            <Button style={{ border: "dashed" }} onClick={(e) => e}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              login
            </Button>
          </DialogActions>
        </form>{" "}
      </DialogContent>
    </Dialog>
  );
}
