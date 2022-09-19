import * as React from "react";
import { useState, useEffect } from "react";
import { Container, Link } from "@mui/material";
import { getPosts as apiGetPosts } from "../api/api.js";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async (type) => {
      try {
        const data = await apiGetPosts();
        setPosts(data);
      } catch (error) {
        console.log("Error while getting list of stories.", error);
      }
    };
    getPosts();
  }, []);

  return (
    <Container style={{ height: 400, width: 600 }}>
      {posts.map((post) => (
        <div key={post.EntryID}>
          <Link href={post.EntryUrl} underline="hover" target="_blank">
            {post.EntryText}
          </Link>
        </div>
      ))}
    </Container>
  );
}

export default PostList;
