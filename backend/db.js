const mariadb = require("mariadb");
const hasher = require("bcrypt");

const pool = mariadb.createPool({
  host: "localhost",
  user: "nodejs",
  password: "db",
  connectionLimit: 5,
  database: "dev",
});

/*
  if successful, returns promise that resolves to User object
  all failures throw an exception as follows:
    Invalid password
    Invalid username
    DB Query Error
    DB Connection error
*/
function validateUser(UserName, Password) {
  const dbQueryString = `
                    SELECT UserID, Password
                    FROM user
                    WHERE UserName = "${UserName}"
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
            if (hasher.compareSync(Password, rows[0].Password)) {
              return { user: { userID: rows[0].UserID } };
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
      console.log("DB Connection error", err.message);
      throw err;
    });
}

function addEntry(entryText, entryUrl) {
  console.log("adding", entryText);
  dbQueryString = `
                    INSERT
                    INTO entry (EntryText, EntryUrl)
                    VALUES ('${entryText}', '${entryUrl}')
                    `;
  console.log(dbQueryString);
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
      console.log("DB Connection error", err);
      return "DB Connection error";
    });
}

function getAllEntries() {
  dbQueryString = `
                    SELECT *
                    FROM entry
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

module.exports.addEntry = addEntry;
module.exports.deleteEntry = deleteEntry;
module.exports.getEntry = getEntry;
module.exports.getAllEntries = getAllEntries;
module.exports.validateUser = validateUser;
