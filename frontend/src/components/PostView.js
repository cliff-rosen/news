import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../common/PostAPI";
import { getComments, addComment } from "../common/CommentAPI";
import PostVote from "./PostVote";
import CommentsTree from "./CommentsTree";
import { Link as RouterLink } from "react-router-dom";
import { Container, Link } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { getElapsedTime } from "../common/TimeUtils";

export default function PostView({ sessionManager }) {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const { postid: entryID } = useParams();

  useEffect(() => {
    console.log("Post - data retrieval useEffect for ", entryID);
    updatePostPage();
  }, [entryID]);

  const updatePostPage = async () => {
    const updatedPost = await getPost(entryID);
    const updatedComments = await getComments(entryID);
    setPost(updatedPost);
    setComments(updatedComments);
  };

  const submitComment = async (e) => {
    //if (sessionManager.user.userID === 0) {
    if (sessionManager.getUserFromStorage().userID === 0) {
      console.log(
        "submitComment called with userID === 0",
        sessionManager.user
      );
      sessionManager.showLoginThen(submitComment, []);
      e.preventDefault();
      return;
    }

    if (e) e.preventDefault();

    if (comment === "") {
      setMessage("Please enter a comment and resubmit.");
      return;
    }

    try {
      await addComment(entryID, null, comment);
      await updatePostPage();
      setComment("");
      setMessage("");
    } catch (e) {
      console.log("submitComment error: ", e.message);
      setMessage("Error adding comment: " + e.message);
    }
  };

  const updateVote = (idx, newVoteCount, newVote) => {
    setPost((curPost) => {
      return { ...curPost, VoteCount: newVoteCount, Vote: newVote };
    });
  };

  console.log("Post", sessionManager.user);

  if (!post) return <div></div>;

  return (
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
          flex: "0 0 50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <PostVote
          sessionManager={sessionManager}
          postIdx={0}
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
        <div style={{ fontSize: "12px", color: "gray" }}>
          Posted by {post.UserName} {getElapsedTime(post.EntryDateTime)} ago |{" "}
          <RouterLink
            style={{ textDecoration: "none", color: "gray" }}
            to={`/post/${post.EntryID}`}
          >
            {post.CommentCount} comments
          </RouterLink>
        </div>{" "}
        {post.EntryText && (
          <div>
            <span
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "14px",
                color: "black",
              }}
            >
              {post.EntryText}
            </span>
          </div>
        )}
        <div style={{ marginTop: "20px" }}></div>
        <div>
          {" "}
          {message}
          <form onSubmit={submitComment}>
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
              style={{ textTransform: "unset" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              add comment
            </Button>
          </form>
        </div>
        <div style={{ marginTop: "20px" }}></div>
        <div>
          <CommentsTree
            sessionManager={sessionManager}
            comments={comments}
            updatePostPage={updatePostPage}
          />
        </div>
      </div>
    </div>
  );
}
