import React from "react";
import { Button, Toolbar, Typography } from "@mui/material";
import { useLocation, Link, useNavigate } from "react-router-dom";

const sections = [
  { name: "Trending", link: "/" },
  { name: "New", link: "/new" },
  { name: "Post", link: "/add" },
];

const Navbar = ({ userManager }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const lout = () => {
    userManager.logout();
  };

  return (
    <div>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          Tripper's Almanac
        </Typography>
        <Typography variant="h6" sx={{ display: { xs: "block", sm: "none" } }}>
          TA
        </Typography>
        {sections.map((section) => (
          <Button
            key={section.link}
            onClick={() => navigate(section.link)}
            sx={{
              color: location.pathname === section.link ? "#79a" : "GrayText",
              fontWeight:
                location.pathname === section.link ? "bold" : "normal",
            }}
          >
            {section.name}
          </Button>
        ))}
        <span>
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
        </span>
      </Toolbar>
    </div>
  );
};

export default Navbar;
