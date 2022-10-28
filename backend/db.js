const mariadb = require("mariadb");
const hasher = require("bcrypt");
const psl = require("psl");
const { dbSecrets } = require("./secrets.js");

const pool = mariadb.createPool({
  host: dbSecrets.DB_HOST,
  database: dbSecrets.DB_NAME,
  user: dbSecrets.DB_USER,
  password: dbSecrets.DB_PASSWORD,
  connectionLimit: dbSecrets.DB_CONNECTION_LIMIT,
});

function addUser(userName, password) {
  console.log("AddUser: " + userName + "/" + password);
  const passwordHash = hasher.hashSync(password, 10);
  const dbQueryString = `
                    INSERT
                    INTO user (UserName, Password)
                    VALUES ("${userName}", "${passwordHash}")
                    `;
  return pool
    .getConnection()
    .then((conn) => {
      return conn
        .query(dbQueryString)
        .then((rows) => {
          console.log("returned", rows);
          console.log("Rows returned: " + rows.length);
          return rows;
        })
        .catch((err) => {
          console.log("DB Query Error: " + JSON.stringify(err));
          if (err.code == "ER_DUP_ENTRY") {
            throw "DUPLICATE";
          } else {
            throw "UNKNOWN";
          }
        })
        .finally(() => {
          console.log("releasing connection");
          conn.release();
        });
    })
    .catch((err) => {
      console.log("DB error", err);
      throw err;
    });
}

/*
  if successful, returns promise that resolves to User object
  all failures throw an exception as follows:
    Invalid password
    Invalid username
    DB Query Error
    DB Connection error
*/
function validateUser(userName, password) {
  const dbQueryString = `
                    SELECT UserID, UserName, Password
                    FROM user
                    WHERE UserName = "${userName}"
                    `;
  console.log("Querying database with: " + dbQueryString);
  return pool
    .getConnection()
    .then((conn) => {
      return conn
        .query(dbQueryString)
        .then((rows) => {
          console.log("Rows returned: " + rows.length);
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
        })
        .catch((err) => {
          console.log("DB Query Error: " + err.message);
          throw err;
        })
        .finally(() => {
          console.log("releasing connection");
          conn.release();
        });
    })
    .catch((err) => {
      console.log("DB error", err.message);
      throw err;
    });
}

//////////////////////////// ENTRIES ////////////////////////
function getDomain(url) {
  try {
    const host = new URL(url).host;
    const domain = psl.parse(host).domain;
    return domain;
  } catch (e) {
    console.log("error - invalid URL");
    return "";
  }
}

function addEntry(entryTitle, entryText, entryUrl, userID) {
  console.log("addEntry", entryTitle);
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
  console.log(dbQueryString);
  return pool
    .getConnection()
    .then((conn) => {
      return conn
        .query(dbQueryString)
        .then((rows) => {
          console.log("addEntry rows returned", rows.length);
          return rows;
        })
        .catch((err) => {
          console.log("DB Query Error: " + err);
          throw "Query did not execute";
        })
        .finally(() => {
          console.log("addEntry releasing connection");
          conn.release();
        });
    })
    .catch((err) => {
      console.log("addEntry DB error", err);
      throw err;
    });
}

function deleteEntry(entryID) {
  dbQueryString = `
  DELETE
  FROM entry
  WHERE entryID = ${entryID}
  `;

  return pool
    .getConnection()
    .then((conn) => {
      return conn
        .query(dbQueryString)
        .then((res) => {
          console.log("returned", res, res.affectedRows);
          return res;
        })
        .catch((err) => {
          console.log("DB Query Error: " + err);
          return "Query did not execute";
        })
        .finally(() => {
          console.log("releasing connection");
          conn.release();
        });
    })
    .catch((err) => {
      console.log("DB Connection error", err);
      return "DB Connection error";
    });
}

function getEntry() {
  dbQueryString = `
  SELECT *
  FROM entry
  WHERE EntryID = 1
  `;
  //console.log(dbQueryString);
  return pool
    .getConnection()
    .then((conn) => {
      return conn
        .query(dbQueryString)
        .then((rows) => {
          console.log("Rows returned: " + rows.length);
          return rows;
        })
        .catch((err) => {
          console.log("DB Query Error: " + err);
          return "Query did not execute";
        })
        .finally(() => {
          console.log("releasing connection");
          conn.release();
        });
    })
    .catch((err) => {
      console.log("DB error", err);
      return err;
    });
}

function getAllEntries() {
  dbQueryString = `
                    SELECT e.*, u.UserName, v.vote
                    FROM entry e
                    JOIN user u ON e.UserID = u.UserID
                    LEFT JOIN user_entry_vote v 
                      ON e.UserID = v.UserID and e.EntryID = v.EntryID
                    ORDER BY e.EntryDateTime desc
                    `;
  return pool
    .getConnection()
    .then((conn) => {
      return conn
        .query(dbQueryString)
        .then((rows) => {
          //console.log("result", rows);
          console.log("Rows returned: " + rows.length);
          return rows;
        })
        .catch((err) => {
          console.log("*** Query did not execute: " + err);
          return "Query did not execute";
        })
        .finally(() => {
          console.log("releasing connection");
          conn.release();
        });
    })
    .catch((err) => {
      console.log("DB Connection error");
      return "DB Connection error";
    });
}

////////////////////////////////////////////////////

function addUserEntryVote(userID, entryID, vote) {
  console.log("addUserEntryVote", userID);

  dbQueryString = `
                    INSERT
                    INTO user_entry_vote (
                      UserID, EntryID, Vote
                    )
                    VALUES (
                      ${userID},'${entryID}','${vote}'
                    )
                    `;
  console.log(dbQueryString);
  return pool
    .getConnection()
    .then((conn) => {
      return conn
        .query(dbQueryString)
        .then((rows) => {
          console.log("addUserEntryVote rows returned", rows.length);
          return rows;
        })
        .catch((err) => {
          console.log("DB Query Error: " + err);
          throw "Query did not execute";
        })
        .finally(() => {
          console.log("addUserEntryVote releasing connection");
          conn.release();
        });
    })
    .catch((err) => {
      console.log("addUserEntryVote DB error", err);
      throw err;
    });
}

function updateUserEntryVote(userID, entryID, vote) {
  console.log("editUserEntryVote", userID);

  dbQueryString = `
                    UPDATE user_entry_vote 
                    SET Vote = '${vote}'
                    WHERE 
                          UserID = ${userID}
                      AND EntryID = '${entryID}'
                    `;
  console.log(dbQueryString);
  return pool
    .getConnection()
    .then((conn) => {
      return conn
        .query(dbQueryString)
        .then((res) => {
          console.log("editUserEntryVote returned: ", res.affectedRows);
          if (res.affectedRows !== 1) {
            throw "Query did not update correct rowcount of 1";
          }
          return res;
        })
        .catch((err) => {
          console.log("DB Query Error: " + err);
          throw "Query did not execute";
        })
        .finally(() => {
          console.log("editUserEntryVote releasing connection");
          conn.release();
        });
    })
    .catch((err) => {
      console.log("editUserEntryVote DB error", err);
      throw err;
    });
}

module.exports.addEntry = addEntry;
module.exports.deleteEntry = deleteEntry;
module.exports.getEntry = getEntry;
module.exports.getAllEntries = getAllEntries;
module.exports.validateUser = validateUser;
module.exports.addUser = addUser;
module.exports.addUserEntryVote = addUserEntryVote;
module.exports.updateUserEntryVote = updateUserEntryVote;
