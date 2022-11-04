import { setCommentVote as apiSetCommentVote } from "../common/CommentAPI";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function CommentVote({
  sessionManager,
  commentIdx,
  commentID,
  voteCount,
  vote,
  updateCommentVote,
}) {
  const voteHandler = async (iVote) => {
    //console.log("voteHandler", sessionManager.user);
    if (sessionManager.user.userID === 0) {
      console.log("voteHandler called with userID === 0");
      sessionManager.showLoginThen(apiSetCommentVote, [commentID, iVote]);
      return;
    }
    var newVote;
    var newVoteCount;

    if (!vote) {
      // no vote or 0 vote, so straight processing
      newVote = iVote;
      newVoteCount = voteCount + iVote;
    } else if (vote === iVote) {
      // undoing whatever the existing vote is
      newVote = 0;
      newVoteCount = voteCount - iVote;
    } else {
      // switching from 1 to -1 or -1 to 1;
      newVote = iVote;
      newVoteCount = voteCount + 2 * iVote;
    }

    await apiSetCommentVote(commentID, newVote);
    updateCommentVote(commentIdx, newVoteCount, newVote);
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
