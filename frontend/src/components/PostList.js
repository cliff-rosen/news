import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getPosts as apiGetPosts } from "../common/PostAPI";
import { Container, Link } from "@mui/material";
import { getElapsedTime } from "../common/TimeUtils";
import PostVote from "./PostVote";

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
    const getPosts = async (iOrder) => {
      try {
        const data = await apiGetPosts(iOrder);
        setPosts(data);
      } catch (error) {
        console.log("Error while getting list of stories.", error);
      }
    };
    console.log("PostList getPost about to run: ", order);
    getPosts(order);
  }, [userManager.user.userID, order]);

  return (
    <div style={{ maxWidth: 800, border: "none" }}>
      {posts.map((post, i) => (
        <div
          key={post.EntryID}
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: 10,
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
              {post.EntryUrl ? (
                <Link
                  style={{ fontSize: "14px" }}
                  color="primary"
                  href={post.EntryUrl}
                  target="_blank"
                  underline="hover"
                >
                  {post.EntryTitle}
                </Link>
              ) : (
                <RouterLink
                  style={{
                    fontSize: "14px",
                    textDecoration: "none",
                    color: "#1976D2",
                  }}
                  to={`/post/${post.EntryID}`}
                >
                  {post.EntryTitle}
                </RouterLink>
              )}{" "}
              <span style={{ fontSize: "12px", color: "gray" }}>
                {post.EntryUrlDomain ? "(" + post.EntryUrlDomain + ")" : ""}
              </span>
            </div>
            {false && post.EntryText && (
              <div>
                <span style={{ fontSize: "12px", color: "black" }}>
                  {post.EntryText}
                </span>
              </div>
            )}
            <div style={{ fontSize: "12px", color: "gray" }}>
              Posted by {post.UserName} {getElapsedTime(post.EntryDateTime)} ago
              |{" "}
              <RouterLink
                style={{ textDecoration: "none", color: "gray" }}
                to={`/post/${post.EntryID}`}
              >
                {post.CommentCount} comments
              </RouterLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
