import { useState, useEffect, useMemo } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Post from "../components/Post";
import { getPosts as apiGetPosts } from "../common/PostAPI";

const POST_LIST_PAGE_SIZE = 15;

function useQueryParams() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

/*
Displays self retrieved list of Posts
List based on order and start
Posts will directly update their vote counts using updateVote
PostList -> Post -> PostVote
*/
function PostList({ sessionManager }) {
  const [posts, setPosts] = useState([]);
  const [more, setMore] = useState(false);
  const queryParams = useQueryParams();
  const order = queryParams.get("order") || "trending";
  const start = Number(queryParams.get("start")) || 0;

  const updateVote = (idx, newVoteCount, newVote) => {
    var post = posts[idx];
    post = { ...post, VoteCount: newVoteCount, Vote: newVote };
    setPosts((curPosts) => {
      var newPosts = [...curPosts];
      newPosts[idx] = post;
      return newPosts;
    });
  };

  useEffect(() => {
    const getPosts = async (iOrder, iStart, iLimit) => {
      try {
        const res = await apiGetPosts(iOrder, iStart, iLimit);
        const data = res.rows;
        setPosts(data);
        setMore(res.more);
      } catch (error) {
        console.log("Error while getting list of stories.", error);
      }
    };
    console.log("PostList getPost about to run with order: ", order);
    getPosts(order, start, POST_LIST_PAGE_SIZE);
  }, [sessionManager.user.userID, order, start]);

  return (
    <div style={{ maxWidth: 800, border: "none" }}>
      {posts.map((post, i) => {
        post.idx = i;
        return (
          <Post
            key={post.EntryID}
            sessionManager={sessionManager}
            post={post}
            updateVote={updateVote}
          />
        );
      })}

      {more && (
        <div style={{ marginLeft: 50 }}>
          <RouterLink
            style={{
              fontSize: "14px",
              textDecoration: "none",
              color: "#1976D2",
            }}
            to={`/?order=${order}&start=${start + POST_LIST_PAGE_SIZE}`}
          >
            - more -
          </RouterLink>
        </div>
      )}
      {!more && posts.length !== POST_LIST_PAGE_SIZE && (
        <div style={{ marginLeft: 50 }}>
          <RouterLink
            style={{
              fontSize: "14px",
              textDecoration: "none",
              color: "#1976D2",
            }}
            to={`/?order=${order}&start=${0}`}
          >
            - back to start -
          </RouterLink>
        </div>
      )}
    </div>
  );
}

export default PostList;
