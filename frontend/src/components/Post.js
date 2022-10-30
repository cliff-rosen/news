import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../Common/PostAPI";
import { PostVote } from "./PostVote";
import { Link as RouterLink } from "react-router-dom";
import { Container, Link } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { getElapsedTime } from "../Common/TimeUtils";

export default function Post({ userManager }) {
  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  const { postid: entryID } = useParams();

  useEffect(() => {
    console.log("useEffect getPost for ", entryID);
    getPost(entryID)
      .then((res) => {
        console.log(res);
        setPost(res);
      })
      .catch((e) => console.log("getPost error: ", e));
  }, [entryID]);

  const updateVote = (idx, newVoteCount, newVote) => {
    setPost((curPost) => {
      return { ...curPost, VoteCount: newVoteCount, Vote: newVote };
    });
  };

  if (!post) return <div></div>;

  return (
    <div
      key={post.EntryID}
      style={{
        display: "flex",
        flexDirection: "row",
        paddingLeft: 20,
        paddingTop: 15,
        alignItems: "start",
        justifyContent: "start",
        width: "70%",
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
          userManager={userManager}
          postIdx={0}
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
        <div style={{ fontSize: "12px", color: "gray" }}>
          Posted by {post.UserName} {getElapsedTime(post.EntryDateTime)} ago |{" "}
          <RouterLink
            style={{ textDecoration: "none", color: "gray" }}
            to={`/post/${post.EntryID}`}
          >
            {post.CommentCount} comments
          </RouterLink>
        </div>
        <div style={{ marginTop: "20px" }}></div>
        <div>
          {" "}
          <TextField
            id="comment"
            style={{ width: "400px", margin: "5px" }}
            multiline
            rows={4}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setComment("")}
          >
            add comment
          </Button>
        </div>
      </div>
    </div>
  );
}
