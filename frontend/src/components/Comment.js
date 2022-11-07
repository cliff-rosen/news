import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentVote from "./CommentVote";
import { addComment } from "../common/CommentAPI";
import { getElapsedTime } from "../common/TimeUtils";
import { TextField, Button } from "@mui/material";

const COMMENT_INDENT_FACTOR = 25;

export default function Comment({
  sessionManager,
  comment,
  updatePostView,
  updateCommentVote,
}) {
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);

  const submitReply = async () => {
    if (sessionManager.getUserFromStorage().userID === 0) {
      console.log("addComment called with userID === 0", sessionManager.user);
      sessionManager.showLoginThen(submitReply, []);
      return;
    }

    await addComment(comment.EntryID, comment.CommentID, reply);
    setReply("");
    setShowReply(false);
    updatePostView();
  };

  return (
    <div
      className={"CommentContainer"}
      style={{
        display: "flex",
        flexDirection: "row",
        paddingLeft: comment.Level * COMMENT_INDENT_FACTOR,
        paddingTop: 15,
        alignItems: "start",
        justifyContent: "start",
      }}
    >
      <div
        className="CommentOffset"
        style={{
          flex: "0 0 12px",
          fontSize: "12px",
          color: "gray",
          paddingTop: 2,
          paddingRight: 0,
          width: 12,
          alignSelf: "flex-start",
        }}
      >
        |
      </div>

      <div className={"CommentContent"} style={{ border: "none" }}>
        <div style={{ fontSize: "12px", color: "gray" }}>
          {comment.CommentUserName} {getElapsedTime(comment.DateTimeAdded)} ago
        </div>
        <div style={{ whiteSpace: "pre-wrap", fontSize: "13px" }}>
          {comment.CommentText}
        </div>
        <div
          style={{
            flex: "0 0 50px",
            display: "flex",
            flexDirection: "column",
            marginLeft: "-4px",
          }}
        >
          <div style={{ display: "flex" }}>
            <CommentVote
              sessionManager={sessionManager}
              commentIdx={comment.idx}
              commentID={comment.CommentID}
              VoteScore={comment.VoteScore}
              vote={comment.Vote}
              updateCommentVote={updateCommentVote}
            ></CommentVote>
            <div style={{ alignSelf: "center", fontSize: "11px" }}>
              {!showReply && (
                <Link
                  style={{
                    textDecoration: "none",
                    color: "gray",
                    marginLeft: 10,
                  }}
                  to="#"
                  onClick={() => setShowReply(true)}
                >
                  reply
                </Link>
              )}
            </div>
          </div>
        </div>

        {showReply && (
          <div style={{ border: "none" }}>
            <TextField
              autoFocus
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              multiline
              rows={4}
              size="small"
              InputProps={{ style: { fontSize: 10, width: "400px" } }}
            />
            <br />
            <Button
              style={{ textTransform: "unset", fontSize: 10 }}
              disabled={!reply}
              onClick={submitReply}
            >
              reply
            </Button>
            <Button
              style={{ textTransform: "unset", fontSize: 10 }}
              onClick={() => setShowReply(false)}
            >
              cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
