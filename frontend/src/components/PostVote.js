import {
  addPostVote as apiAddPostVote,
  editPostVote as apiEditPostVote,
} from "../Common/PostAPI";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export function PostVote({
  userManager,
  postIdx,
  entryID,
  voteCount,
  vote,
  updateVote,
}) {
  const voteHandler = (newVote) => {
    //userManager.requireUser();
    if (userManager.user.userID === 0) {
      console.log("voteHandler called with userID === 0");
      //return;
    }
    if (vote == null) {
      addVote(voteCount + newVote, newVote);
    } else {
      if (newVote === vote) {
        editVote(voteCount - newVote, 0);
      } else {
        if (vote !== 0) {
          editVote(voteCount + 2 * newVote, newVote);
        } else {
          editVote(voteCount + newVote, newVote);
        }
      }
    }
  };

  const addVote = async (newVoteCount, newVote) => {
    try {
      await apiAddPostVote(entryID, newVote);
      updateVote(postIdx, newVoteCount, newVote);
      console.log("post vote added");
    } catch (e) {
      console.log("error adding post vote", e);
    }
  };

  const editVote = async (newVoteCount, newVote) => {
    try {
      await apiEditPostVote(entryID, newVote);
      updateVote(postIdx, newVoteCount, newVote);
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
          color: vote === 1 ? "green" : "lightGray",
        }}
        onClick={() => userManager.loginThen(voteHandler, [1])}
      >
        <ArrowDropUpIcon fontSize="medium" />
      </IconButton>
      <span style={{ fontSize: 10 }}>{voteCount}</span>
      <IconButton
        style={{
          height: 10,
          width: 12,
          color: vote === -1 ? "green" : "lightGray",
        }}
        onClick={() => voteHandler(-1)}
      >
        <ArrowDropDownIcon fontSize="medium" />
      </IconButton>
    </div>
  );
}
