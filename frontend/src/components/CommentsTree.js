export default function CommentsTree({ comments }) {
  return (
    <div>
      COMMENTS:
      <br />
      <br />
      {comments.map((comment) => (
        <div key={comment.CommentID}>{comment.CommentText}</div>
      ))}
    </div>
  );
}
