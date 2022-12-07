import { useState, useEffect } from "react";
import PostVote from "./PostVote";
import { logPostClick } from "../utils/PostAPI";
import { getElapsedTime } from "../utils/TimeUtils";
import { entryTypesMap, conditionsMap, substancesMap } from "../utils/Lookups";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Post({ sessionManager, post, updateVote, showText }) {
  const [substances, setSubstances] = useState([]);
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    const subsArr = post.SubstanceIDs ? post.SubstanceIDs.split(",") : [];
    var subs = subsArr.map((s) => substancesMap[s]);
    subs = subs.join(", ");
    setSubstances(subs);

    const condsArr = post.ConditionIDs ? post.ConditionIDs.split(",") : [];
    var conds = condsArr.map((c) => conditionsMap[c]);
    conds = conds.join(", ");
    setConditions(conds);
  }, [post]);

  const logClick = () => {
    logPostClick(post.EntryID);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: 10,
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <div
          style={{
            flex: "0 0 50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <PostVote
            sessionManager={sessionManager}
            postIdx={post.idx}
            entryID={post.EntryID}
            VoteScore={post.VoteScore}
            vote={post.Vote}
            updateVote={updateVote}
          ></PostVote>
        </div>
        <div>
          <div>
            {post.EntryUrl ? (
              <Link
                style={{
                  fontSize: "14.5px",
                }}
                color="primary"
                href={post.EntryUrl}
                target="_blank"
                underline="hover"
                onClick={logClick}
              >
                {post.EntryTitle}
              </Link>
            ) : (
              <RouterLink
                style={{
                  fontSize: "14.5px",
                  textDecoration: "none",
                  color: "#1976D2",
                }}
                to={`/post/${post.EntryID}`}
              >
                {post.EntryTitle}
              </RouterLink>
            )}{" "}
            <span
              style={{
                fontSize: "13px",
                color: "gray",
              }}
            >
              {post.EntryUrlDomain ? "(" + post.EntryUrlDomain + ")" : ""}
            </span>
          </div>
          {(substances || conditions) && (
            <div style={{ fontSize: "12px", color: "gray" }}>
              <b>substances</b>: {substances} | <b>conditions:</b> {conditions}
            </div>
          )}
          {showText && post.EntryText && (
            <div>
              <span
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "13px",
                  color: "black",
                }}
              >
                {post.EntryText}
              </span>
            </div>
          )}
          <div style={{ fontSize: "13px", color: "gray" }}>
            <i>{entryTypesMap[post.EntryTypeID]}</i> posted by {post.UserName}{" "}
            {getElapsedTime(post.EntryDateTime)} ago |{" "}
            <RouterLink
              style={{ textDecoration: "none", color: "gray" }}
              to={`/post/${post.EntryID}`}
            >
              {post.CommentCount} comments
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
}
