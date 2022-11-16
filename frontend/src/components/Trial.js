import { useState, useEffect } from "react";
import { Link as RouterLink, MemoryRouter } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function X() {
  return "X";
}

export default function Trial() {
  return (
    <div>
      <X /> <X />
    </div>
  );
}
