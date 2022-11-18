import { useState, useEffect, useMemo } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import Post from "../components/Post";
import PostListFilter from "./PostListFilter";
import { getPosts as apiGetPosts } from "../common/PostAPI";
import { Button } from "@mui/material";

const POST_LIST_PAGE_SIZE = 15;

function useQueryParams() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function PostList({ sessionManager }) {
  const [posts, setPosts] = useState([]);
  const [more, setMore] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const queryParams = useQueryParams();
  const order = queryParams.get("order") || "trending";
  const start = Number(queryParams.get("start")) || 0;
  const entryTypeID = queryParams.get("entrytypeid") || "";
  const substanceIDs = queryParams.get("substanceids") || "";
  const conditionIDs = queryParams.get("conditionids") || "";
  const navigate = useNavigate();

  const updateVote = (idx, newVoteScore, newVote) => {
    var post = posts[idx];
    post = { ...post, VoteScore: newVoteScore, Vote: newVote };
    setPosts((curPosts) => {
      var newPosts = [...curPosts];
      newPosts[idx] = post;
      return newPosts;
    });
  };

  const hideFilter = () => {
    setShowFilter(false);
  };

  const applyFilter = (
    entryTypeID,
    substancesSelection,
    conditionsSelection
  ) => {
    const substances = [];
    const conditions = [];
    var newSubstanceIDs = "";
    var newConditionIDs = "";

    for (const [key, value] of Object.entries(substancesSelection)) {
      if (value) substances.push(key);
    }
    newSubstanceIDs = substances.join(",");

    for (const [key, value] of Object.entries(conditionsSelection)) {
      if (value) conditions.push(key);
    }
    newConditionIDs = conditions.join(",");

    navigate(
      `/?order=${order}&start=${start}&entrytypeid=${entryTypeID}&substanceids=${newSubstanceIDs}&conditionids=${newConditionIDs}`
    );
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await apiGetPosts(
          order,
          start,
          POST_LIST_PAGE_SIZE,
          entryTypeID,
          substanceIDs,
          conditionIDs
        );
        const data = res.rows;
        setPosts(data);
        setMore(res.more);
        setFetchError(false);
      } catch (error) {
        console.log("Error while getting list of stories.", error);
        setFetchError(true);
      }
    };
    console.log("PostList.getPost with order, start: ", order, start);
    getPosts();
  }, [
    sessionManager.user.userID,
    order,
    start,
    entryTypeID,
    substanceIDs,
    conditionIDs,
  ]);

  if (fetchError) {
    return <div>Doh! An error occurred. Please refresh page.</div>;
  }

  return (
    <div style={{ border: "none" }}>
      <Button onClick={toggleFilter}>filter</Button>
      {showFilter && (
        <PostListFilter applyFilter={applyFilter} hideFilter={hideFilter} />
      )}
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
