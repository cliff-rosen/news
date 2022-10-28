import { useState } from "react";
import { addPostVote as apiAddPostVote } from "../Common/PostAPI";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import e from "express";

export function PostVote({ userManager, entryID, vote }) {
  const [myVote, setMyVote] = useState(vote);

  const voteHandler = () => {
    if (myVote == null) {
      addVote();
    } else {
      if (myVote == 1) {
        editVote(0);
      } else {
        editVote(1);
      }
    }
  };

  const addVote = async () => {
    const body = JSON.stringify({
      entryID,
      vote: 1,
    });

    try {
      await apiAddPostVote(body);
      setMyVote(1);
      console.log("post vote added");
    } catch (e) {
      console.log("error adding post vote", e);
    }
  };

  const editVote = (v) => {};

  return (
    <IconButton
      style={{ height: 10, width: 12, color: myVote ? "green" : "lightGray" }}
      onClick={voteHandler}
    >
      <ArrowDropUpIcon fontSize="medium" />
    </IconButton>
  );
}
