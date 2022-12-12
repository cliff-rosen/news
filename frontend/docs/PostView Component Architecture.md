# PostView Component Architecture

<pre>
PostView(sessionManager)   
    s post  
    s comments  
    m updatePostView  

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
    m updateCommentVote

        Comment(
            key={comment.CommentID}
            sessionManager={sessionManager}
            comment={comment}
            updatePostView={updatePostView}
            updateCommentVote={updateCommentVote}
        )
</pre>
