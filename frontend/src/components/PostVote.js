import { setPostVote as apiSetPostVote } from "../utils/PostAPI";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function PostVote({
  sessionManager,
  postIdx,
  entryID,
  VoteScore,
  vote,
  updateVote,
}) {
  const voteHandler = async (iVote) => {
    console.log("voteHandler", sessionManager.user);
    if (sessionManager.user.userID === 0) {
      console.log("voteHandler called with userID === 0");
      sessionManager.showLoginThen(apiSetPostVote, [entryID, iVote]);
      return;
    }
    var newVote;
    var newVoteScore;

    if (!vote) {
      // no vote or 0 vote, so straight processing
      newVote = iVote;
      newVoteScore = VoteScore + iVote;
    } else if (vote === iVote) {
      // undoing whatever the existing vote is
      newVote = 0;
      newVoteScore = VoteScore - iVote;
    } else {
      // switching from 1 to -1 or -1 to 1;
      newVote = iVote;
      newVoteScore = VoteScore + 2 * iVote;
    }

    await apiSetPostVote(entryID, newVote);
    updateVote(postIdx, newVoteScore, newVote);
  };

  return (
    <div>
      <IconButton
        style={{
          height: 10,
          width: 12,
          color: vote === 1 ? "green" : "lightGray",
        }}
        onClick={() => voteHandler(1)}
      >
        <ArrowDropUpIcon fontSize="medium" />
      </IconButton>
      <span style={{ fontSize: 10 }}>{VoteScore}</span>
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
