import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Button,
  Toolbar,
  Typography,
  unstable_useEnhancedEffect,
} from "@mui/material";
import Box from "@mui/material/Box";

const sections = [
  { name: "trending", link: "/" },
  { name: "new", link: "/new" },
  { name: "post", link: "/add" },
  //{ name: "Trial", link: "/trial" },
];

const Navbar = ({ userManager }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const lout = () => {
    userManager.logout();
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        paddingBottom: 10,
        border: "none",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          border: "none",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          Tripper's Almanac
        </Link>
      </Typography>
      <Typography variant="h6" sx={{ display: { xs: "block", sm: "none" } }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          TA
        </Link>
      </Typography>
      <div style={{ minWidth: 30 }}></div>
      <Box
        sx={{
          flexGrow: 1,
          border: "none",
        }}
      >
        {sections.map((section) => (
          <Button
            key={section.link}
            onClick={() => navigate(section.link)}
            sx={{
              border: "none",
              textTransform: "unset",
              height: 20,
              color:
                location.pathname === section.link ? "#0057b7a" : "GrayText",
              fontWeight:
                location.pathname === section.link ? "bold" : "normal",
            }}
          >
            {section.name}
          </Button>
        ))}
      </Box>

      <Box sx={{ flexGrow: 0 }}>
        {userManager.user?.userID > 0 ? (
          <span>
            {userManager.user.userName} |{" "}
            <Link
              style={{ textDecoration: "none", color: "gray" }}
              to="#"
              onClick={lout}
            >
              logout
            </Link>
          </span>
        ) : (
          <Link
            style={{ textDecoration: "none", color: "gray" }}
            to="#"
            onClick={() => {
              userManager.showLogin();
            }}
          >
            login (register)
          </Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
