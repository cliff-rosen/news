import Comment from "./Comment";

export default function CommentsTree({
  userManager,
  comments,
  updatePostPage,
}) {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.CommentID}>
          <Comment
            userManager={userManager}
            comment={comment}
            updatePostPage={updatePostPage}
          />
        </div>
      ))}
    </div>
  );
}
