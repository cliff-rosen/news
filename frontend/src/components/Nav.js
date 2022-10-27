import { logout } from "../Common/Auth";
import { Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const sections = [
  { name: "Trending", link: "/" },
  { name: "New", link: "new" },
  { name: "Post", link: "/add" },
];

const Navbar = ({ user, setUserX }) => {
  const navigate = useNavigate();

  const lout = () => {
    logout();
    setUserX({ userID: 0 });
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
            sx={{ color: "GrayText" }}
          >
            {section.name}
          </Button>
        ))}
        <span>
          {user?.userID > 0 ? (
            <span>
              {user.userName} | <span onClick={lout}>logout</span>
            </span>
          ) : (
            <span
              onClick={() => {
                console.log("click");
                setUserX({ userID: -99 });
              }}
            >
              login
            </span>
          )}
        </span>
      </Toolbar>
    </div>
  );
};

export default Navbar;
