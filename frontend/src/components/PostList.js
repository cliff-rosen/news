import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  useFilterQueryParams,
  writeFilterParamsToLocalStorage,
  readFilterFromLocalStorage,
  isFilterStored,
  writeFilterObjectToLocalStorage,
  getStoredFilterURL,
  getStoredFilterText,
} from "../common/FilterUtils";
import Post from "../components/Post";
import PostListFilter from "./PostListFilter";
import { getPosts as apiGetPosts } from "../common/PostAPI";
import { Button, Typography } from "@mui/material";

const POST_LIST_PAGE_SIZE = 15;

function PostList({ sessionManager }) {
  const [posts, setPosts] = useState([]);
  const [more, setMore] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { order, start, entryTypeIDs, substanceIDs, conditionIDs } =
    useFilterQueryParams();
  const {
    dummy1,
    dummy2,
    entryTypeIDs: sEntryTypeIDs,
    substanceIDs: sSubstanceIDs,
    conditionIDs: sConditionIDs,
  } = readFilterFromLocalStorage();

  const navigate = useNavigate();

  const hideFilter = () => {
    setShowFilter(false);
  };

  const applyFilter = (
    entryTypesSelection,
    substancesSelection,
    conditionsSelection
  ) => {
    const entryTypes = [];
    const substances = [];
    const conditions = [];
    var newEntryTypeIDs = "";
    var newSubstanceIDs = "";
    var newConditionIDs = "";

    for (const [key, value] of Object.entries(entryTypesSelection)) {
      if (value) entryTypes.push(key);
    }
    newEntryTypeIDs = entryTypes.join(",");

    for (const [key, value] of Object.entries(substancesSelection)) {
      if (value) substances.push(key);
    }
    newSubstanceIDs = substances.join(",");

    for (const [key, value] of Object.entries(conditionsSelection)) {
      if (value) conditions.push(key);
    }
    newConditionIDs = conditions.join(",");

    writeFilterObjectToLocalStorage({
      order,
      start,
      entryTypeIDs: newEntryTypeIDs,
      substanceIDs: newSubstanceIDs,
      conditionIDs: newConditionIDs,
    });

    navigate(
      `/postlist?order=${order}&start=${start}&entrytypeids=${newEntryTypeIDs}&substanceids=${newSubstanceIDs}&conditionids=${newConditionIDs}`
    );
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const updateVote = (idx, newVoteScore, newVote) => {
    var post = posts[idx];
    post = { ...post, VoteScore: newVoteScore, Vote: newVote };
    setPosts((curPosts) => {
      var newPosts = [...curPosts];
      newPosts[idx] = post;
      return newPosts;
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await apiGetPosts(
          order,
          start,
          POST_LIST_PAGE_SIZE,
          sEntryTypeIDs || entryTypeIDs,
          sSubstanceIDs || substanceIDs,
          sConditionIDs || conditionIDs
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
    entryTypeIDs,
    substanceIDs,
    conditionIDs,
    sEntryTypeIDs,
    sSubstanceIDs,
    sConditionIDs,
  ]);

  if (fetchError) {
    return <div>Doh! An error occurred. Please refresh page.</div>;
  }

  return (
    <div style={{ border: "none" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button onClick={toggleFilter}>filter</Button>
        {isFilterStored() && (
          <Typography style={{ fontSize: 12 }}>
            [{getStoredFilterText()}]
          </Typography>
        )}
      </div>
      {showFilter && (
        <PostListFilter
          applyFilter={applyFilter}
          hideFilter={hideFilter}
          selections={{
            entryTypeIDs: sEntryTypeIDs || entryTypeIDs,
            substanceIDs: sSubstanceIDs || substanceIDs,
            conditionIDs: sConditionIDs || conditionIDs,
          }}
        />
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
            to={getStoredFilterURL(start + POST_LIST_PAGE_SIZE)}
          >
            - more -
          </RouterLink>
        </div>
      )}
      {start > 0 && !more && posts.length !== POST_LIST_PAGE_SIZE && (
        <div style={{ marginLeft: 50 }}>
          <RouterLink
            style={{
              fontSize: "14px",
              textDecoration: "none",
              color: "#1976D2",
            }}
            to={getStoredFilterURL(0)}
          >
            - back to start -
          </RouterLink>
        </div>
      )}
    </div>
  );
}

export default PostList;
