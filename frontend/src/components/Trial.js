import * as React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
    <Container
      style={{
        width: 500,
        border: "solid",
        borderColor: "yellow",
      }}
    >
      <form
        onSubmit={submitForm}
        style={{ width: { xs: 300, md: 500 }, border: "dashed" }}
      >
        <TextField
          id="username"
          sx={{ width: { xs: 250, md: 400 }, margin: "5px" }}
          autoFocus
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          required
        />
      </form>{" "}
    </Container>
  );
}
