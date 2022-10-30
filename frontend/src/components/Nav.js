import React from "react";
import { Button, Toolbar, Typography } from "@mui/material";
import { useLocation, Link, useNavigate } from "react-router-dom";

const sections = [
  { name: "Trending", link: "/" },
  { name: "New", link: "/new" },
  { name: "Post", link: "/add" },
  //{ name: "Trial", link: "/trial" },
];

const Navbar = ({ userManager }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const lout = () => {
    userManager.logout();
  };

  return (
    <Toolbar
      component="nav"
      variant="dense"
      sx={{
        justifyContent: "space-between",
        backgroundColor: "#e0e0e0",
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flex: "0 0 300px",
        }}
      >
        {sections.map((section) => (
          <Button
            key={section.link}
            onClick={() => navigate(section.link)}
            sx={{
              border: "none",
              color:
                location.pathname === section.link ? "#0057b7a" : "GrayText",
              fontWeight:
                location.pathname === section.link ? "bold" : "normal",
            }}
          >
            {section.name}
          </Button>
        ))}
      </div>

      <div style={{ border: "none" }}>
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
            login
          </Link>
        )}
      </div>
    </Toolbar>
  );
};

export default Navbar;
