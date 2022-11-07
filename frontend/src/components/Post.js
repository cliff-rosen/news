import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PostVote from "./PostVote";
import { logPostClick } from "../common/PostAPI";
import { getElapsedTime } from "../common/TimeUtils";

export default function Post({ sessionManager, post, updateVote }) {
  const logClick = () => {
    logPostClick(post.EntryID);
  };

  return (
    <div>
      <div
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
            flex: "0 0 50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <PostVote
            sessionManager={sessionManager}
            postIdx={post.idx}
            entryID={post.EntryID}
            VoteScore={post.VoteScore}
            vote={post.Vote}
            updateVote={updateVote}
          ></PostVote>
        </div>
        <div>
          <div>
            {post.EntryUrl ? (
              <Link
                style={{
                  fontSize: "14.5px",
                }}
                color="primary"
                href={post.EntryUrl}
                target="_blank"
                underline="hover"
                onClick={logClick}
              >
                {post.EntryTitle}
              </Link>
            ) : (
              <RouterLink
                style={{
                  fontSize: "14.5px",
                  textDecoration: "none",
                  color: "#1976D2",
                }}
                to={`/post/${post.EntryID}`}
              >
                {post.EntryTitle}
              </RouterLink>
            )}{" "}
            <span
              style={{
                fontSize: "13px",
                color: "gray",
              }}
            >
              {post.EntryUrlDomain ? "(" + post.EntryUrlDomain + ")" : ""}
            </span>
          </div>
          {false && post.EntryText && (
            <div>
              <span style={{ fontSize: "13px", color: "black" }}>
                {post.EntryText}
              </span>
            </div>
          )}
          <div style={{ fontSize: "13px", color: "gray" }}>
            Posted by {post.UserName} {getElapsedTime(post.EntryDateTime)} ago |{" "}
            <RouterLink
              style={{ textDecoration: "none", color: "gray" }}
              to={`/post/${post.EntryID}`}
            >
              {post.CommentCount} comments
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
}
