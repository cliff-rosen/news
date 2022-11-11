import { useState, useEffect } from "react";
import { addPost as apiAddPost } from "../common/PostAPI";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { TextField, Button } from "@mui/material";

function PostAdd({ sessionManager }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    sessionManager.requireUser();
  });

  const formSubmit = async (e) => {
    e.preventDefault();

    if (title === "") {
      setMessage("Please add a title.");
      return;
    }

    try {
      await apiAddPost(url, title, desc);
      setUrl("");
      setTitle("");
      setDesc("");
      sessionManager.setSessionMessageWrapper("Entry submitted");
    } catch (e) {
      console.log("error adding post", e);
      setMessage("Doh! An unexpected error occurred.  Please try again.");
    }
  };
  return (
    <div>
      <div>
        {message && (
          <div>
            <Alert severity="error">{message}</Alert>
            <br />
          </div>
        )}
      </div>
      <div style={{ margin: "20px" }}></div>
      <Container maxWidth="xs">
        <Box component="form" onSubmit={formSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="url"
            autoFocus
            type="text"
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            variant="outlined"
          />
          <br />
          <TextField
            margin="normal"
            fullWidth
            id="title"
            type="text"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            required
          />
          <br />
          <TextField
            margin="normal"
            fullWidth
            id="desc"
            multiline
            rows={4}
            type="text"
            label="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            variant="outlined"
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            post
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default PostAdd;
