import * as React from "react";
import { useState, useEffect } from "react";
import { getPosts as apiGetPosts } from "../Common/PostAPI";
import { Container, Link } from "@mui/material";
import { getElapsedTime } from "../Common/TimeUtils";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
            paddingTop: 15,
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              paddingTop: 2,
              paddingRight: 0,
              width: 12,
            }}
          >
            {i + 1}.
          </div>

          <div
            style={{
              color: "gray",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <IconButton style={{ height: 10, width: 12 }}>
              <ArrowDropUpIcon fontSize="medium" />
            </IconButton>
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
                Posted by {post.UserName} {getElapsedTime(post.EntryDateTime)}{" "}
                ago | {Math.ceil(Math.random() * 100)} comments
              </span>
            </div>
          </div>
        </section>
      ))}
    </Container>
  );
}

export default PostList;
