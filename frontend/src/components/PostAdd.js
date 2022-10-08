import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Container } from "@mui/system";
import styled from "@emotion/styled";
import { addPost as apiAddPost } from "../Common/PostAPI";
import { login, getUser } from "../Common/Auth";

const LayoutContainer = styled(Container)(() => ({
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

function PostAdd({ user, setUser }) {
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");

  const lin = () => {
    login().then((res) => setUser(getUser()));
  };

  const formSubmit = async () => {
    const body = JSON.stringify({ entryUrl: url, entryText: desc });
    try {
      await apiAddPost(body);
      setUrl("");
      setDesc("");
    } catch (e) {
      console.log("error adding post", e);
    }
  };

  if (!user?.userID) {
    return (
      <div>
        {" "}
        <button onClick={lin}>login</button>
      </div>
    );
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
          id="desc"
          style={{ width: "400px", margin: "5px" }}
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
