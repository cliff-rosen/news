import * as React from "react";
import { useState, useEffect } from "react";
import { Container, Link } from "@mui/material";
import { getPosts as apiGetPosts } from "../Common/PostAPI";

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
      User: {user.userID}
      {posts.map((post) => (
        <div key={post.EntryID}>
          {user?.userID ? "X" : ""}
          <Link href={post.EntryUrl} underline="hover" target="_blank">
            {post.EntryText}
          </Link>
        </div>
      ))}
    </Container>
  );
}

export default PostList;
