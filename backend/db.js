const mariadb = require("mariadb");
const hasher = require("bcrypt");
const psl = require("psl");
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

async function addEntry(entryTitle, entryText, entryUrl, userID) {
  console.log("addEntry: ", entryTitle);
  entryTitle = entryTitle.replace(/'/g, "\\'");
  entryText = entryText.replace(/'/g, "\\'");
  const entryUrlDomain = getDomain(entryUrl);

  dbQueryString = `
                    INSERT
                    INTO entry (
                      UserID,
                      EntryTitle, EntryText, EntryUrl, EntryUrlDomain,
                      EntryDateTime)
                    VALUES (
                      ${userID},
                      '${entryTitle}','${entryText}', '${entryUrl}', '${entryUrlDomain}',
                      NOW())
                    `;

  const res = await pool.query(dbQueryString);
  console.log("addEntry returned", res);
  return res;
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
                      SELECT e.*, u.UserName, v.Vote
                      FROM entry e
                      JOIN user u ON e.UserID = u.UserID
                      LEFT JOIN user_entry_vote v 
                      ON v.UserID = ${userID} and e.EntryID = v.EntryID                      
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
                    SELECT e.*, u.UserName, v.Vote
                    FROM entry e
                    JOIN user u ON e.UserID = u.UserID
                    LEFT JOIN user_entry_vote v 
                      ON v.UserID = ${userID} and e.EntryID = v.EntryID
                    `;
  if (order === "trending") {
    dbQueryString += " ORDER BY e.VoteCount desc";
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

  await updateEntryVoteCountDB(entryID);
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

async function updateEntryVoteCountDB(entryID) {
  console.log("updateEntryVoteCountDB", entryID);

  dbQueryString = `
                    UPDATE entry
                    SET VoteCount = 
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

async function getEntryComments(entryID) {
  console.log("getEntryComments", entryID);
  dbQueryString = `
                    SELECT c.*, CONCAT_WS(':', path, CommentID) AS FullPath, u.UserName as CommentUserName
                    FROM comment c
                    JOIN user u
                      ON c.CommentUserID = u.UserID
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

module.exports.addEntry = addEntry;
module.exports.deleteEntry = deleteEntry;
module.exports.getEntry = getEntry;
module.exports.getAllEntries = getAllEntries;
module.exports.validateUser = validateUser;
module.exports.addUser = addUser;
module.exports.addOrUpdateUserEntryVote = addOrUpdateUserEntryVote;
module.exports.addComment = addComment;
module.exports.getEntryComments = getEntryComments;
