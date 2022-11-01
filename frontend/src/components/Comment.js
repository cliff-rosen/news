import { useEffect, useState } from "react";
import PostVote from "./PostVote";
import { addComment } from "../common/CommentAPI";
import { getElapsedTime } from "../common/TimeUtils";
import { TextField, Button } from "@mui/material";

export default function Comment({ comment, updatePostPage }) {
  const [reply, setReply] = useState("");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        paddingLeft: comment.Level * 25,
        paddingTop: 15,
        alignItems: "start",
        justifyContent: "start",
      }}
    >
      <div
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
        •
      </div>

      <div style={{ border: "none" }}>
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
            <PostVote
              userManager={{ x: 1 }}
              postIdx={0}
              entryID={comment.EntryID}
              voteCount={0}
              vote={0}
              updateVote={(x) => x}
            ></PostVote>
            <div style={{ alignSelf: "flex-end", fontSize: "11px" }}>
              <TextField
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                size="small"
                InputProps={{ style: { fontSize: 10 } }}
              />
              <Button
                style={{ textTransform: "unset", fontSize: 10 }}
                onClick={async (e) => {
                  await addComment(comment.EntryID, comment.CommentID, reply);
                  setReply("");
                  updatePostPage();
                }}
              >
                reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
