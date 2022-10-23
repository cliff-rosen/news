import { logout } from "../Common/Auth";
import { Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const sections = [
  { name: "Trending", link: "/" },
  { name: "New", link: "new" },
  { name: "Post", link: "/add" },
];

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const lout = () => {
    logout();
    setUser({ userID: 0 });
  };

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
        <span>
          {user?.userID ? (
            <span>
              {user.userName}
              <button onClick={lout}>logout</button>
            </span>
          ) : (
            "login"
          )}
        </span>
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
