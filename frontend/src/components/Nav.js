import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const sections = [
  {
    name: "trending",
    link: "/postlist?order=trending",
  },
  { name: "new", link: "/postlist?order=new" },
  { name: "post", link: "/add" },
  //{ name: "Trial", link: "/trial" },
];

const Navbar = ({ sessionManager }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (section) => {
    const s = location.search || "";

    if (section.name === "trending") {
      return (
        (location.pathname === "/" || location.pathname === "/postlist") &&
        (s === "" || s.includes("order=trending"))
      );
    }
    if (section.name === "new") {
      return (
        (location.pathname === "/" || location.pathname === "/postlist") &&
        s.includes("order=new")
      );
    }
    if (section.name === "post") {
      return location.pathname === "/add";
    }
    return false;
  };

  const lout = () => {
    sessionManager.logout();
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
              color: isActive(section) ? "#1976d2" : "GrayText",
              fontWeight: isActive(section) ? "bold" : "normal",
            }}
          >
            {section.name}
          </Button>
        ))}
      </Box>

      <Box sx={{ flexGrow: 0, fontSize: ".8em" }}>
        {sessionManager.user?.userID > 0 ? (
          <span>
            {sessionManager.user.userName} |{" "}
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
              sessionManager.showLogin();
            }}
          >
            login (register)
          </Link>
        )}
        {" | "}
        <Link
          style={{
            textDecoration: "none",
            color: location.pathname === "/help" ? "#1976d2" : "gray",
            fontWeight: location.pathname === "/help" ? "bold" : "normal",
          }}
          to="/help"
        >
          help
        </Link>
      </Box>
    </nav>
  );
};

export default Navbar;
