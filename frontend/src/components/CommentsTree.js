import Comment from "./Comment";

export default function CommentsTree({
  sessionManager,
  comments,
  updatePostPage,
}) {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.CommentID}>
          <Comment
            sessionManager={sessionManager}
            comment={comment}
            updatePostPage={updatePostPage}
          />
        </div>
      ))}
    </div>
  );
}
