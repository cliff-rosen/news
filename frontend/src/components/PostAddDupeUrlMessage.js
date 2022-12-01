import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Alert from "@mui/material/Alert";

export default function PostAddDupeUrlMessage({ postID }) {
  return (
    <Alert severity="error">
      The URL you entered was already submitted. You can view the original post{" "}
      <Link component={RouterLink} to={`/post/${postID}`}>
        here
      </Link>
      .
    </Alert>
  );
}
