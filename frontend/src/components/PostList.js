import * as React from "react";
import { useState, useEffect } from "react";
import { getPosts as apiGetPosts } from "../Common/PostAPI";
import { Container, Link } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

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
    <Container style={{ height: 400, width: 800 }}>
      {posts.map((post, i) => (
        <section
          key={post.EntryID}
          style={{
            display: "flex",
            padding: 7,
          }}
        >
          <div style={{ fontSize: "14px", color: "gray", paddingRight: 5 }}>
            {i + 1}.
          </div>

          <div style={{ fontSize: "14px", color: "gray", paddingRight: 5 }}>
            <ThumbUpIcon style={{ fontSize: "small" }} />
            <br />
            <ThumbDownIcon style={{ fontSize: "small" }} />
          </div>

          <div>
            <div>
              <Link href={post.EntryUrl} underline="hover" target="_blank">
                {post.EntryTitle}
              </Link>{" "}
              <span style={{ fontSize: "12px", color: "gray" }}>
                {post.EntryUrlDomain ? "(" + post.EntryUrlDomain + ")" : ""}
              </span>
            </div>
            {post.EntryText && (
              <div>
                <span style={{ fontSize: "13px", color: "black" }}>
                  {post.EntryText}
                </span>
              </div>
            )}
            <div>
              <span style={{ fontSize: "12px", color: "gray" }}>
                Posted by {post.UserName} | {Math.ceil(Math.random() * 100)}{" "}
                comments
              </span>
            </div>
          </div>
        </section>
      ))}
    </Container>
  );
}

export default PostList;
