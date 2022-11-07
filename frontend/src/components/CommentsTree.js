import Comment from "./Comment";

export default function CommentsTree({
  sessionManager,
  comments,
  setComments,
  updatePostView,
}) {
  const updateCommentVote = (idx, newVoteScore, newVote) => {
    var comment = comments[idx];
    comment = { ...comment, VoteScore: newVoteScore, Vote: newVote };
    setComments((curComments) => {
      var newComments = [...curComments];
      newComments[idx] = comment;
      return newComments;
    });
  };

  return (
    <div>
      {comments.map((comment, idx) => {
        comment.idx = idx;
        return (
          <Comment
            key={comment.CommentID}
            sessionManager={sessionManager}
            comment={comment}
            updatePostView={updatePostView}
            updateCommentVote={updateCommentVote}
          />
        );
      })}
    </div>
  );
}
