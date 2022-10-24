import * as React from "react";
import { useState, useEffect } from "react";
import { getPosts as apiGetPosts } from "../Common/PostAPI";
import { Container, Link } from "@mui/material";

function PostList({ user }) {
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
          {user?.userID ? "^" : ""}
          <Link href={post.EntryUrl} underline="hover" target="_blank">
            {post.EntryText}
          </Link>{" "}
          <span style={{ fontSize: "12px", color: "gray" }}>
            Posted by {post.UserName}
          </span>
        </div>
      ))}
    </Container>
  );
}

export default PostList;
