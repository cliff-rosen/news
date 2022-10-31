import { useEffect, useState } from "react";
import PostVote from "./PostVote";
import { getElapsedTime } from "../common/TimeUtils";

export default function Comment({ comment }) {
  return (
    <div
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
            <div style={{ alignSelf: "flex-end", fontSize: "11px" }}>reply</div>
          </div>
        </div>
      </div>
    </div>
  );
}
