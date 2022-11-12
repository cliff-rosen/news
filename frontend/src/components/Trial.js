import * as React from "react";
import { Link as RouterLink, MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

export default function Trial() {
  return (
    <div>
      <Link to="/">Link</Link>
      <br />
      <Link to="/" component={RouterLink}>
        Link with comp
      </Link>
      <br />
      <RouterLink to="/">Router Link</RouterLink>
      <br />
    </div>
  );
}
