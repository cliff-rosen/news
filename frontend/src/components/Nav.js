import {
  Button,
  AppBar,
  Box,
  Container,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const sections = [
  { name: "Trending", link: "/" },
  { name: "New", link: "new" },
  { name: "Post", link: "/add" },
];

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          Psychedelic News
        </Typography>
        <Typography variant="h6" sx={{ display: { xs: "block", sm: "none" } }}>
          PN
        </Typography>
        {sections.map((section) => (
          <Button
            key={section.link}
            onClick={() => navigate(section.link)}
            sx={{ color: "GrayText" }}
          >
            {section.name}
          </Button>
        ))}
        rsheklin
      </Toolbar>
    </div>
  );
};

{
  /* <Link key={section.link} to={section.link} sx={{ p: 1, flexShrink: 0 }}>
  {section.name}
</Link>; */
}

export default Navbar;
