# PostView Component Architecture

<pre>
PostView({ sessionManager })   
    post  
    comments  
    updatePostView  

    Post(
        sessionManager={sessionManager}
        post={post}
        updateVote={updatePostVote}
        showText={true}
    )

    CommentsTree(
        sessionManager={sessionManager}
        comments={comments}
        setComments={setComments}
        updatePostView={updatePostView}
    )
    updateCommentVote

        Comment(
            key={comment.CommentID}
            sessionManager={sessionManager}
            comment={comment}
            updatePostView={updatePostView}
            updateCommentVote={updateCommentVote}
        )
</pre>
