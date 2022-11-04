import Comment from "./Comment";

export default function CommentsTree({
  sessionManager,
  comments,
  updatePostView,
}) {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.CommentID}>
          <Comment
            sessionManager={sessionManager}
            comment={comment}
            updatePostView={updatePostView}
          />
        </div>
      ))}
    </div>
  );
}
