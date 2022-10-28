import React, { useState, useEffect } from "react";
import { getPosts as apiGetPosts } from "../Common/PostAPI";
import { Container, Link } from "@mui/material";
import { getElapsedTime } from "../Common/TimeUtils";
import { PostVote } from "./PostVote";

function PostList({ userManager }) {
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
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <PostVote
              userManager={userManager}
              entryID={post.EntryID}
              vote={post.vote}
            ></PostVote>
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
