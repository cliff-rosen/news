import React, { useState } from "react";
import {
  addPostVote as apiAddPostVote,
  editPostVote as apiEditPostVote,
} from "../Common/PostAPI";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export function PostVote({ userManager, entryID, voteCount, vote }) {
  const [myVote, setMyVote] = useState(vote);
  const [myVoteCount, setMyVoteCount] = useState(voteCount || 0);

  const voteHandler = (v) => {
    console.log("voteHandler", v);
    if (myVote == null) {
      addVote(v);
      setMyVoteCount(myVoteCount + v);
    } else {
      if (myVote === v) {
        editVote(0);
        setMyVoteCount(myVoteCount - v);
      } else {
        editVote(v);
        if (myVoteCount !== 0) {
          setMyVoteCount(myVoteCount + 2 * v);
        } else {
          setMyVoteCount(myVoteCount + v);
        }
      }
    }
  };

  const addVote = async (v) => {
    const body = JSON.stringify({
      entryID,
      vote: v,
    });

    try {
      await apiAddPostVote(body);
      setMyVote(v);
      console.log("post vote added");
    } catch (e) {
      console.log("error adding post vote", e);
    }
  };

  const editVote = async (v) => {
    const body = JSON.stringify({
      entryID,
      vote: v,
    });

    try {
      await apiEditPostVote(body);
      setMyVote(v);
      console.log("post vote updated");
    } catch (e) {
      console.log("error updating post vote", e);
    }
  };

  return (
    <div>
      <IconButton
        style={{
          height: 10,
          width: 12,
          color: myVote === 1 ? "green" : "lightGray",
        }}
        onClick={() => voteHandler(1)}
      >
        <ArrowDropUpIcon fontSize="medium" />
      </IconButton>
      <span style={{ fontSize: 10 }}>{myVoteCount}</span>
      <IconButton
        style={{
          height: 10,
          width: 12,
          color: myVote === -1 ? "green" : "lightGray",
        }}
        onClick={() => voteHandler(-1)}
      >
        <ArrowDropDownIcon fontSize="medium" />
      </IconButton>
    </div>
  );
}
