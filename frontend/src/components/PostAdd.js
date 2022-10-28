import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Container } from "@mui/system";
import styled from "@emotion/styled";
import { addPost as apiAddPost } from "../Common/PostAPI";
import { useEffect } from "react";

const LayoutContainer = styled(Container)(() => ({
  overflow: "hidden",
  width: "100%",
}));

function PostAdd({ userManager }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    userManager.requireUser();
  });

  const formSubmit = async () => {
    if (title === "") {
      setMessage("Please add a title.");
      return;
    }

    const body = JSON.stringify({
      entryUrl: url,
      entryTitle: title,
      entryText: desc,
    });
    try {
      await apiAddPost(body);
      setUrl("");
      setTitle("");
      setDesc("");
      setMessage("The entry has been submitted.");
    } catch (e) {
      console.log("error adding post", e);
    }
  };

  return (
    <LayoutContainer>
      {message && (
        <div>
          {message}
          <br />
          <br />
        </div>
      )}
      <form>
        <TextField
          id="url"
          style={{ width: "400px", margin: "5px" }}
          type="text"
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          variant="outlined"
        />
        <br />
        <TextField
          id="title"
          style={{ width: "400px", margin: "5px" }}
          type="text"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
        />
        <br />
        <TextField
          id="desc"
          style={{ width: "400px", margin: "5px" }}
          multiline
          rows={4}
          type="text"
          label="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          variant="outlined"
        />
        <br />
        <Button variant="contained" color="primary" onClick={formSubmit}>
          post
        </Button>
      </form>
    </LayoutContainer>
  );
}

export default PostAdd;
