import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../common/PostAPI";
import { getComments, addComment } from "../common/CommentAPI";
import Post from "../components/Post";
import CommentsTree from "./CommentsTree";
import { TextField, Button } from "@mui/material";

export default function PostView({ sessionManager }) {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const { postid: entryID } = useParams();

  useEffect(() => {
    console.log("Post.useEffect for:", entryID);
    updatePostView();
  }, [entryID, sessionManager]);

  const updatePostView = async () => {
    try {
      const updatedPost = await getPost(entryID);
      const updatedComments = await getComments(entryID);
      setPost(updatedPost);
      setComments(updatedComments);
    } catch (e) {
      console.log("PostView.updatePostView error:", e.message);
      setMessage("Doh! Something unexpected happened.  Please refresh page.");
      return;
    }
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
      await updatePostView();
      setComment("");
      setMessage("");
    } catch (e) {
      console.log("submitComment error: ", e.message);
      setMessage("Error adding comment: " + e.message);
    }
  };

  const updatePostVote = (idx, newVoteScore, newVote) => {
    setPost((curPost) => {
      return { ...curPost, VoteScore: newVoteScore, Vote: newVote };
    });
  };

  if (!post) return <div>{message}</div>;

  return (
    <div style={{ border: "none" }}>
      <Post
        sessionManager={sessionManager}
        post={post}
        updateVote={updatePostVote}
        showText={true}
      />

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
        ></div>
        <div>
          <div>
            {" "}
            {message}
            <form onSubmit={submitComment}>
              <TextField
                id="comment"
                sx={{ width: { xs: 350, md: 600 }, margin: "5px" }}
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
              setComments={setComments}
              updatePostView={updatePostView}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
