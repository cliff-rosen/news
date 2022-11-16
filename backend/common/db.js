const mariadb = require("mariadb");
const hasher = require("bcrypt");
const psl = require("psl");
const requestIP = require("request-ip");
const { dbSecrets } = require("./secrets.js");

/*
JSON RESULTS
------------

Queries return two different kinds of results, 
depending on the type of query you execute. 

For SELECT:
Returns an array. 
Each value in the array is a returned row as a JSON object.

For INSERT, DELETE and UPDATE:
Returns a JSON object with the following properties:
  affectedRows: An integer listing the number of affected rows.
  insertId: An integer noting the auto-increment ID of the last row written to the table.
  warningStatus: An integer indicating whether the query ended with a warning.

ERRORS:
------
check .code property

*/

const pool = mariadb.createPool({
  host: dbSecrets.DB_HOST,
  database: dbSecrets.DB_NAME,
  user: dbSecrets.DB_USER,
  password: dbSecrets.DB_PASSWORD,
  connectionLimit: dbSecrets.DB_CONNECTION_LIMIT,
});

async function addUser(userName, password) {
  userName = userName.toLowerCase();
  console.log("AddUser: " + userName + "/" + password);
  const passwordHash = hasher.hashSync(password, 10);
  const dbQueryString = `
                    INSERT
                    INTO user (UserName, Password)
                    VALUES ("${userName}", "${passwordHash}")
                    `;

  try {
    const res = await pool.query(dbQueryString);
    console.log("addUser returned: ", res);
    return res;
  } catch (err) {
    console.log("DB Query Error: " + JSON.stringify(err));
    if (err.code == "ER_DUP_ENTRY") {
      throw "DUPLICATE";
    } else {
      throw "UNKNOWN";
    }
  }
}

/*
  if successful, returns promise that resolves to User object
  all failures throw an exception as follows:
    Invalid password
    Invalid username
    DB Query Error
    DB Connection error
*/
async function validateUser(userName, password) {
  const dbQueryString = `
                    SELECT UserID, UserName, Password
                    FROM user
                    WHERE UserName = "${userName}"
                    `;
  console.log("Querying database with: " + dbQueryString);

  const rows = await pool.query(dbQueryString);
  console.log("Rows returned: " + rows);
  if (rows.length == 1) {
    if (hasher.compareSync(password, rows[0].Password)) {
      return {
        user: { userID: rows[0].UserID, userName: rows[0].UserName },
      };
    } else {
      throw new Error("Invalid password");
    }
  } else {
    throw new Error("Invalid username");
  }
}

//////////////////////////// ENTRIES ////////////////////////
function getDomain(url) {
  try {
    const host = new URL(url).host;
    const domain = psl.parse(host).domain;
    return domain;
  } catch (e) {
    console.log("getDomain: invalid URL");
    return "";
  }
}

async function addEntry(
  userID,
  entryTypeID,
  entryTitle,
  entryText,
  entryUrl,
  substances,
  conditions
) {
  console.log("addEntry: ", entryTitle);

  try {
    const res = await addEntryDB(
      userID,
      entryTypeID,
      entryTitle,
      entryText,
      entryUrl
    );
    const entryID = res.insertId;
    await addEntryAttributesDB(entryID, "substance", substances || []);
    await addEntryAttributesDB(entryID, "condition", conditions || []);
  } catch (e) {
    console.log("addEntry error:", e.message);
    throw new Error("Add entry error");
  }

  return { status: "success" };
}

async function addEntryDB(
  userID,
  entryTypeID,
  entryTitle,
  entryText,
  entryUrl
) {
  console.log("addEntryDB: ", entryTitle);
  entryTitle = entryTitle.replace(/'/g, "\\'");
  entryText = entryText.replace(/'/g, "\\'");
  const entryUrlDomain = getDomain(entryUrl);

  dbQueryString = `
                    INSERT
                    INTO entry (
                      UserID, EntryTypeID,
                      EntryTitle, EntryText, EntryUrl, EntryUrlDomain,
                      EntryDateTime
                      )
                    VALUES (
                      ${userID}, ${entryTypeID},
                      '${entryTitle}','${entryText}', '${entryUrl}', '${entryUrlDomain}',
                      NOW())
                    `;

  const res = await pool.query(dbQueryString);
  console.log("addEntry returned", res);
  return res;
}

async function addEntryAttributesDB(entryID, attributeName, attributes) {
  console.log("addEntryAttributesDB: ", attributes);

  var attributeTableName;
  var attributeColumnName;

  if (attributeName === "substance") {
    attributeTableName = "entry_substance";
    attributeColumnName = "SubstanceID";
  } else if (attributeName === "condition") {
    attributeTableName = "entry_health_condition";
    attributeColumnName = "ConditionID";
  } else {
    throw new Error("addEntryAttributesDB - invalid attributeName");
  }

  attributes.forEach(async (attributeID) => {
    dbQueryString = `
      INSERT
      INTO ${attributeTableName} (
        EntryID,
        ${attributeColumnName}
      )
      VALUES (
        ${entryID},
        ${attributeID}
      )
      `;

    try {
      await pool.query(dbQueryString);
    } catch (e) {
      console.log("addEntryAttributesDB Error:", e);
    }
  });

  return { status: "success" };
}

async function deleteEntry(entryID) {
  dbQueryString = `
          DELETE
          FROM entry
          WHERE entryID = ${entryID}
          `;

  const res = await pool.query(dbQueryString);
  console.log("returned: ", res);
  return res;
}

async function getEntry(userID, entryID) {
  dbQueryString = `
                      SELECT e.*, e.VoteScoreActual + e.VoteScoreBias as VoteScore, u.UserName, v.Vote,
                      SubstanceIDs, ConditionIDs
                      FROM entry e
                      JOIN user u ON e.UserID = u.UserID
                      LEFT JOIN user_entry_vote v 
                      ON v.UserID = ${userID} and e.EntryID = v.EntryID 
                      LEFT JOIN (
                        SELECT e1.entryid, GROUP_CONCAT(es1.substanceid) AS substanceids
                        FROM entry e1 JOIN entry_substance es1 ON e1.entryid = es1.entryid
                        WHERE e1.EntryID = ${entryID}
                      ) AS substances ON e.entryID = substances.entryid
                      LEFT JOIN (
                        SELECT e2.entryid, GROUP_CONCAT(ec1.conditionid) AS conditionids
                        FROM entry e2 JOIN entry_health_condition ec1 ON e2.entryid = ec1.entryid
                        WHERE e2.EntryID = ${entryID}
                      ) AS conditions ON e.entryID = conditions.entryid
                      WHERE e.EntryID = ${entryID}
                      `;

  try {
    const res = await pool.query(dbQueryString);
    return res;
  } catch (err) {
    console.log("*** Query did not execute: " + err);
    throw new Error("Query did not execute");
  }
}

async function getAllEntries(userID, order, start, limit) {
  dbQueryString = `
                    SELECT e.*, e.VoteScoreActual + e.VoteScoreBias as VoteScore,
                    u.UserName, v.Vote,
                    SubstanceIDs, ConditionIDs
                    FROM entry e
                    JOIN user u ON e.UserID = u.UserID
                    LEFT JOIN user_entry_vote v 
                      ON v.UserID = ${userID} and e.EntryID = v.EntryID
                    LEFT JOIN (
                      SELECT e1.entryid, GROUP_CONCAT(es1.substanceid) AS substanceids
                      FROM entry e1 JOIN entry_substance es1 ON e1.entryid = es1.entryid
                      GROUP BY e1.entryid
                    ) AS substances ON e.entryID = substances.entryid
                    LEFT JOIN (
                      SELECT e2.entryid, GROUP_CONCAT(ec1.conditionid) AS conditionids
                      FROM entry e2 JOIN entry_health_condition ec1 ON e2.entryid = ec1.entryid
                      GROUP BY e2.entryid                      
                    ) AS conditions ON e.entryID = conditions.entryid
                    `;
  if (order === "trending") {
    dbQueryString += " ORDER BY e.Rank desc";
  } else {
    dbQueryString += " ORDER BY e.EntryDateTime desc";
  }

  dbQueryString += ` LIMIT ${limit} OFFSET ${start}`;

  try {
    const res = await pool.query(dbQueryString);
    return res;
  } catch (err) {
    console.log("*** Query did not execute: " + err);
    throw new Error("Query did not execute");
  }
}

////////////////////////////////////////////////////

async function addOrUpdateUserEntryVote(userID, entryID, vote) {
  var status = "READY";

  try {
    await addUserEntryVoteDB(userID, entryID, vote);
    status = "ADD";
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      status = "UPDATE";
    } else {
      console.log("addOrUpdateUserEntryVote error", e);
      throw new Error(e);
    }
  }

  if (status === "UPDATE") {
    console.log("addOrUpdateUserEntryVote now updating");
    await updateUserEntryVoteDB(userID, entryID, vote);
  }

  await updateEntryVoteScoreDB(entryID);
  return { result: "DONE", status };
}

async function addUserEntryVoteDB(userID, entryID, vote) {
  console.log("addUserEntryVoteDB", userID);

  dbQueryString = `
                    INSERT
                    INTO user_entry_vote (
                      UserID, EntryID, Vote
                    )
                    VALUES (
                      ${userID},${entryID},${vote}
                    )
                    `;
  console.log(dbQueryString);
  const res = await pool.query(dbQueryString);
  console.log("addUserEntryVoteDB returned", res);
  return res;
}

async function updateUserEntryVoteDB(userID, entryID, vote) {
  console.log("updateUserEntryVote", userID);

  dbQueryString = `
                    UPDATE user_entry_vote 
                    SET Vote = ${vote}
                    WHERE 
                          UserID = ${userID}
                      AND EntryID = ${entryID}
                    `;
  console.log(dbQueryString);
  const res = await pool.query(dbQueryString);
  console.log("updateUserEntryVote returned", res);
  return res;
}

async function updateEntryVoteScoreDB(entryID) {
  console.log("updateEntryVoteScoreDB", entryID);

  dbQueryString = `
                    UPDATE entry
                    SET VoteScoreActual = 
                      (
                        SELECT sum(Vote)
                        FROM user_entry_vote
                        WHERE entryID = ${entryID}
                      )
                    WHERE EntryID = ${entryID}
                    `;

  console.log(dbQueryString);
  const res = await pool.query(dbQueryString);
  if (res.affectedRows !== 1) {
    throw "Query did not update correct rowcount of 1";
  }
  console.log("updateUserEntryVote returned", res);
  return res;
}

async function addComment(userID, parentCommentID, entryID, commentText) {
  console.log("addComment: ", userID);
  commentText = commentText.replace(/'/g, "\\'");

  var path;
  var level;

  if (!parentCommentID) {
    path = "0";
    level = 0;
  } else {
    const parent = await getEntryComment(parentCommentID);
    path = parent[0].Path + ":" + parentCommentID;
    level = parent[0].Level + 1;
  }

  const res = await addCommentDB(
    userID,
    parentCommentID,
    entryID,
    commentText,
    path,
    level
  );
  await updateEntryCommentCountDB(entryID);
  return res;
}

async function addCommentDB(
  userID,
  parentCommentID,
  entryID,
  commentText,
  path,
  level
) {
  console.log("addCommentDB with parent", parentCommentID);
  dbQueryString = `
                    INSERT
                    INTO comment (
                      CommentUserID, ParentCommentID, EntryID,
                      CommentText,
                      Path, Level,
                      DateTimeAdded
                      )
                    VALUES (
                      ${userID}, ${parentCommentID}, ${entryID},
                      '${commentText}',
                      '${path}', ${level},
                      NOW()
                      )
                    `;

  const res = await pool.query(dbQueryString);
  console.log("addCommentDB returned", res);
  return res;
}

async function updateEntryCommentCountDB(entryID) {
  console.log("updateEntryCommentCount", entryID);

  dbQueryString = `
                    UPDATE entry
                    SET CommentCount = 
                      (
                        SELECT count(EntryID)
                        FROM comment
                        WHERE entryID = ${entryID}
                      )
                    WHERE EntryID = ${entryID}
                    `;

  console.log(dbQueryString);
  const res = await pool.query(dbQueryString);
  console.log("updateEntryCommentCount returned", res);
  return res;
}

async function updateComment(commentID, commentText) {
  console.log("updateComment", commentID);
  commentText = commentText.replace(/'/g, "\\'");
  dbQueryString = `
                    UPDATE comment
                    SET CommentText = '${commentText}'
                    WHERE CommentID = ${commentID}
                    `;

  const res = await pool.query(dbQueryString);
  console.log("updateCommentDB returned", res);
  return res;
}

async function getEntryComment(commentID) {
  console.log("getEntryComment", commentID);
  dbQueryString = `
                    SELECT *, CONCAT_WS(':', path, CommentID) AS FullPath
                    FROM comment
                    WHERE CommentID = ${commentID}
                    `;
  try {
    const res = await pool.query(dbQueryString);
    return res;
  } catch (err) {
    console.log("*** Query did not execute: " + err);
    throw new Error("Query did not execute");
  }
}

async function getEntryComments(userID, entryID) {
  console.log("getEntryComments", entryID);
  dbQueryString = `
                    SELECT c.*, CONCAT_WS(':', path, c.CommentID) AS FullPath, 
                      u.UserName as CommentUserName, v.Vote
                    FROM comment c
                    JOIN user u ON c.CommentUserID = u.UserID
                    LEFT JOIN user_comment_vote v
                      ON v.UserID = ${userID} and c.CommentID = v.CommentID
                    WHERE c.EntryID = ${entryID}
                    ORDER BY FullPath
                    `;
  try {
    const res = await pool.query(dbQueryString);
    return res;
  } catch (err) {
    console.log("*** Query did not execute: " + err);
    throw new Error("Query did not execute");
  }
}

///////////////////////////////////////////////
async function addOrUpdateUserCommentVote(userID, commentID, vote) {
  var status = "READY";

  try {
    await addUserCommentVoteDB(userID, commentID, vote);
    status = "ADD";
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      status = "UPDATE";
    } else {
      console.log("addOrUpdateUserCommentVote error", e);
      throw new Error(e);
    }
  }

  if (status === "UPDATE") {
    console.log("addOrUpdateUserCommentVote now updating");
    await updateUserCommentVoteDB(userID, commentID, vote);
  }

  await updateCommentVoteScoreDB(commentID);
  return { result: "DONE", status };
}

async function addUserCommentVoteDB(userID, commentID, vote) {
  console.log("addUserCommentVoteDB", userID);

  dbQueryString = `
                    INSERT
                    INTO user_comment_vote (
                      UserID, CommentID, Vote
                    )
                    VALUES (
                      ${userID},${commentID},${vote}
                    )
                    `;
  console.log(dbQueryString);
  const res = await pool.query(dbQueryString);
  console.log("addUserCommentVoteDB returned", res);
  return res;
}

async function updateUserCommentVoteDB(userID, commentID, vote) {
  console.log("updateUserCommentVote", userID);

  dbQueryString = `
                    UPDATE user_comment_vote 
                    SET Vote = ${vote}
                    WHERE 
                          UserID = ${userID}
                      AND CommentID = ${commentID}
                    `;
  console.log(dbQueryString);
  const res = await pool.query(dbQueryString);
  console.log("updateUserCommentVote returned", res);
  return res;
}

async function updateCommentVoteScoreDB(commentID) {
  console.log("updateCommentVoteScoreDB", commentID);

  dbQueryString = `
                    UPDATE comment
                    SET VoteScore = 
                      (
                        SELECT sum(Vote)
                        FROM user_comment_vote
                        WHERE commentID = ${commentID}
                      )
                    WHERE CommentID = ${commentID}
                    `;

  console.log(dbQueryString);
  const res = await pool.query(dbQueryString);
  if (res.affectedRows !== 1) {
    throw "Query did not update correct rowcount of 1";
  }
  console.log("updateUserCommentVote returned", res);
  return res;
}

////////////////////////////////////////////////////////

async function addLog(req) {
  console.log("addLog");
  var userID;
  if (req.user) {
    userID = req.user.userID;
  } else {
    userID = 0;
  }
  const ipAddress = requestIP.getClientIp(req);
  const userAgent = req.headers["user-agent"];
  const body = { ...req.body };
  if (body.hasOwnProperty("password")) {
    body.password = "*****";
  }
  var bodyString = JSON.stringify(body);
  bodyString = bodyString.replace(/'/g, "\\'");

  dbQueryString = `
                    INSERT
                    INTO api_log (
                      UserID, IPAddress, UserAgent,
                      DateTimeRequest,
                      URL, Method, Body)
                    VALUES (
                      ${userID}, '${ipAddress}', '${userAgent}',
                      NOW(),
                      '${req.url}','${req.method}', '${bodyString}'
                      )
                    `;

  const res = await pool.query(dbQueryString);
  console.log("addLog returned", res);
  return res;
}

async function addFeedback(req) {
  console.log("addFeedback");
  var userID;
  if (req.user) {
    userID = req.user.userID;
  } else {
    userID = 0;
  }
  const ipAddress = requestIP.getClientIp(req);
  const userAgent = req.headers["user-agent"];
  var feedbackText = req.body.feedbackText;
  feedbackText = feedbackText.replace(/'/g, "\\'");

  dbQueryString = `
                    INSERT
                    INTO feedback (
                      UserID, IPAddress, UserAgent,
                      DateTimeAdded,
                      FeedbackText)
                    VALUES (
                      ${userID}, '${ipAddress}', '${userAgent}',
                      NOW(),
                      '${feedbackText}'
                      )
                    `;

  const res = await pool.query(dbQueryString);
  console.log("addFeedback returned", res);
  return res;
}

//////////////////////////////////////////////////////////////
async function getSubstances() {
  dbQueryString = `
                      SELECT *
                      FROM substance
                      ORDER BY SubstanceName
                      `;

  try {
    const res = await pool.query(dbQueryString);
    return res;
  } catch (err) {
    console.log("*** Query did not execute: " + err);
    throw new Error("Query did not execute");
  }
}

async function getConditions() {
  dbQueryString = `
                      SELECT *
                      FROM health_condition
                      ORDER BY ConditionName
                      `;

  try {
    const res = await pool.query(dbQueryString);
    return res;
  } catch (err) {
    console.log("*** Query did not execute: " + err);
    throw new Error("Query did not execute");
  }
}

async function getEntryTypes() {
  dbQueryString = `
                      SELECT *
                      FROM entry_type
                      `;

  try {
    const res = await pool.query(dbQueryString);
    return res;
  } catch (err) {
    console.log("*** Query did not execute: " + err);
    throw new Error("Query did not execute");
  }
}

module.exports.addEntry = addEntry;
module.exports.deleteEntry = deleteEntry;
module.exports.getEntry = getEntry;
module.exports.getAllEntries = getAllEntries;
module.exports.validateUser = validateUser;
module.exports.addUser = addUser;
module.exports.addOrUpdateUserEntryVote = addOrUpdateUserEntryVote;
module.exports.addComment = addComment;
module.exports.updateComment = updateComment;
module.exports.getEntryComments = getEntryComments;
module.exports.addOrUpdateUserCommentVote = addOrUpdateUserCommentVote;
module.exports.addLog = addLog;
module.exports.addFeedback = addFeedback;
module.exports.getSubstances = getSubstances;
module.exports.getConditions = getConditions;
module.exports.getEntryTypes = getEntryTypes;
