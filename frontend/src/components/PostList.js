import React, { useState, useEffect } from "react";
import { getPosts as apiGetPosts } from "../Common/PostAPI";
import { Container, Link } from "@mui/material";
import { getElapsedTime } from "../Common/TimeUtils";
import { PostVote } from "./PostVote";

function PostList({ userManager, order }) {
  const [posts, setPosts] = useState([]);

  const updateVote = (idx, newVoteCount, newVote) => {
    var post = posts[idx];
    post = { ...post, VoteCount: newVoteCount, Vote: newVote };
    setPosts((curPosts) => {
      var newPosts = [...curPosts];
      newPosts[idx] = post;
      return newPosts;
    });
  };

  useEffect(() => {
    console.log("PostList getPosts running");
    const getPosts = async (order) => {
      try {
        const data = await apiGetPosts(order);
        setPosts(data);
      } catch (error) {
        console.log("Error while getting list of stories.", error);
      }
    };
    getPosts();
  }, [userManager.user.userID, order]);

  return (
    <Container style={{ height: 800, width: 800 }}>
      {posts.map((post, i) => (
        <div
          key={post.EntryID}
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: 15,
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <div
            style={{
              flex: "0 0 2px",
              fontSize: "14px",
              color: "gray",
              paddingTop: 2,
              paddingRight: 0,
              width: 12,
            }}
          >
            {false && i + 1}
          </div>

          <div
            style={{
              flex: "0 0 50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <PostVote
              userManager={userManager}
              postIdx={i}
              entryID={post.EntryID}
              voteCount={post.VoteCount}
              vote={post.Vote}
              updateVote={updateVote}
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
        </div>
      ))}
    </Container>
  );
}

export default PostList;
