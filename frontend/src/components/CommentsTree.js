import Comment from "./Comment";

export default function CommentsTree({ comments, updatePostPage }) {
  return (
    <div>
      COMMENTS:
      <br />
      {comments.map((comment) => (
        <div key={comment.CommentID}>
          <Comment comment={comment} updatePostPage={updatePostPage} />
        </div>
      ))}
    </div>
  );
}
