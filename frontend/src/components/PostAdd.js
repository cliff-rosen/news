import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Container } from "@mui/system";
import styled from "@emotion/styled";
import { addPost as apiAddPost } from "../Common/PostAPI";
import { LoginForm } from "./LoginForm";

const LayoutContainer = styled(Container)(() => ({
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

function PostAdd({ user, setUser }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const formSubmit = async () => {
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
    } catch (e) {
      console.log("error adding post", e);
    }
  };

  if (!user?.userID) {
    return <LoginForm user={user} setUser={setUser} />;
  }

  return (
    <LayoutContainer>
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
