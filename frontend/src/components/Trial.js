import * as React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { TextField, Button } from "@mui/material";

export default function Trial(props) {
  const [count, setCount] = useState(0);

  const submitForm = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };

  return (
    <TextField
      id="url"
      autoFocus
      sx={{ width: { sm: 100, md: 500 }, margin: "5px" }}
      type="text"
      label="URL"
      value={""}
      onChange={(e) => e}
      variant="outlined"
    />
  );
}
