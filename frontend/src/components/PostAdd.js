import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { addPost as apiAddPost } from "../common/PostAPI";
import { useEffect } from "react";

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
      setMessage("The entry has been submitted.");
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
            {message}
            <br />
          </div>
        )}
      </div>
      <div style={{ margin: "20px" }}></div>
      <form onSubmit={formSubmit}>
        <TextField
          id="url"
          autoFocus
          sx={{ width: { sm: 350, md: 600 }, margin: "5px" }}
          type="text"
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          variant="outlined"
        />
        <br />
        <TextField
          id="title"
          sx={{ width: { sm: 350, md: 600 }, margin: "5px" }}
          type="text"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          required
        />
        <br />
        <TextField
          id="desc"
          sx={{ width: { sm: 350, md: 600 }, margin: "5px" }}
          multiline
          rows={4}
          type="text"
          label="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          variant="outlined"
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          post
        </Button>
      </form>
    </div>
  );
}

export default PostAdd;
