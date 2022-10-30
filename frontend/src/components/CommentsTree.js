import Comment from "./Comment";

export default function CommentsTree({ comments }) {
  return (
    <div>
      COMMENTS:
      <br />
      <br />
      {comments.map((comment) => (
        <div key={comment.CommentID}>
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
}
