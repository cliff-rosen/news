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
  console.log("PostView");
  useEffect(() => {
    console.log("Post - data retrieval useEffect for  ", entryID);
    updatePostPage();
  }, [entryID, sessionManager]);

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

  if (!post) return <div></div>;

  return (
    <div style={{ border: "none" }}>
      <Post
        sessionManager={sessionManager}
        post={post}
        updateVote={updateVote}
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
    </div>
  );
}
