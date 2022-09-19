const mariadb = require("mariadb");
const hasher = require("bcrypt");
const fs = require("fs");

const pool = mariadb.createPool({
  host: "localhost",
  user: "nodejs",
  password: "db",
  connectionLimit: 5,
  database: "dev",
});

function validateUser(UserName, Password) {
  const dbQueryString = `
                    SELECT UserID, Password
                    FROM user
                    WHERE UserName = "${UserName}"
                    `;
  console.log("Querying database with: " + dbQueryString);
  return new Promise((res, rej) => {
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(dbQueryString)
          .then((rows) => {
            console.log("Rows returned: " + rows.length);
            if (rows.length == 1) {
              if (hasher.compareSync(Password, rows[0].Password)) {
                res({ user: { userID: rows[0].UserID } });
              } else {
                rej({ error: "-100" });
                conn.release();
              }
            } else {
              rej({ error: "-1" });
              conn.release();
            }
          })
          .catch((err) => {
            console.log("DB Query Error: " + err);
            conn.release();
            rej({ error: "-2" });
          });
      })
      .catch((err) => {
        console.log("DB Connection error");
        conn.release();
        rej({ error: "-3" });
      });
  });
}

/*
addUser
    UserName
    Password

Behavior:
    Adds record to user table

Returns    
    On success, res is the following object:
    {"affectedRows":1,"insertId":15,"warningStatus":0}

    On err, rej is a string:
        DUPLICATE   duplicate entry
        CONNECTION  connection error
        OTHER       any other error
*/

function addUser(UserName, Password) {
  console.log("AddUser: " + UserName + "/" + Password);
  const PasswordHash = hasher.hashSync(Password, 10);
  const dbQueryString = `
                    INSERT
                    INTO User (UserName, Password)
                    VALUES ("${UserName}", "${PasswordHash}")
                    `;
  console.log(dbQueryString);
  return new Promise((res, rej) => {
    pool
      .getConnection()
      .then((conn) => {
        console.log("Creating user: " + UserName);
        conn
          .query(dbQueryString)
          .then((queryResult) => {
            console.log("SUCCESS:" + JSON.stringify(queryResult));
            res(queryResult);
            conn.release();
          })
          .catch((err) => {
            console.log("DB Query Error: " + JSON.stringify(err));
            conn.release();
            if (err.code == "ER_DUP_ENTRY") {
              rej("DUPLICATE");
            } else {
              rej("UNKNOWN");
            }
          });
      })
      .catch((err) => {
        console.log("DB Connection error");
        conn.release();
        rej("CONNECTION");
      });
  });
}

function getAllArticles() {
  dbQueryString = `
                    SELECT *
                    FROM article
                    `;
  return new Promise((res, rej) => {
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(dbQueryString)
          .then((rows) => {
            console.log("Rows returned: " + rows.length);
            res(rows);
            conn.release();
          })
          .catch((err) => {
            console.log("*** Query did not execute: " + err);
            conn.release();
            rej("Query did not execute");
          });
      })
      .catch((err) => {
        console.log("DB Connection error");
        conn.release();
        rej("DB Connection error");
      });
  });
}

function getArticle(ArticleID) {
  dbQueryString = `
                    SELECT *
                    FROM article
                    WHERE ArticleID = ${ArticleID}
                    `;
  //console.log(dbQueryString);
  return new Promise((res, rej) => {
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(dbQueryString)
          .then((rows) => {
            console.log("Rows returned: " + rows.length);
            res(rows);
            conn.release();
          })
          .catch((err) => {
            console.log("DB Query Error: " + err);
            conn.release();
            rej("Query did not execute");
          });
      })
      .catch((err) => {
        console.log("DB Connection error");
        conn.release();
        rej("DB Connection error");
      });
  });
}

function updateArticle(articleID, articleName, articleText) {
  articleName = articleName.replace(/'/g, "\\'");
  articleText = articleText.replace(/'/g, "\\'");
  dbQueryString = `
                    UPDATE Article
                    SET ArticleName = '${articleName}',
                        ArticleText = '${articleText}'
                    WHERE ArticleID = '${articleID}'`;
  return new Promise((res, rej) => {
    pool
      .getConnection()
      .then((conn) => {
        console.log("Updated article name: " + articleName);
        conn
          .query(dbQueryString)
          .then((rows) => {
            console.log("Rows returned: " + rows.affectedRows);
            res(rows);
            conn.release();
          })
          .catch((err) => {
            console.log("DB Query Error.  See error.txt");
            fs.writeFile("error.txt", err, (ferr) => console.log(ferr));
            conn.release();
            rej("Query did not execute");
          });
      })
      .catch((err) => {
        console.log("DB Connection error");
        conn.release();
        rej("DB Connection error");
      });
  });
}

function addArticle(articleName, articleText) {
  articleName = articleName.replace(/'/g, "\\'");
  articleText = articleText.replace(/'/g, "\\'");
  dbQueryString = `
                    INSERT
                    INTO article (ArticleName, ArticleText)
                    VALUES ('${articleName}', '${articleText}')
                    `;
  console.log(dbQueryString);
  return new Promise((res, rej) => {
    pool
      .getConnection()
      .then((conn) => {
        console.log("Updated article name: " + articleName);
        conn
          .query(dbQueryString)
          .then((rows) => {
            console.log("Rows returned: " + rows.affectedRows);
            res(rows);
            conn.release();
          })
          .catch((err) => {
            console.log("DB Query Error: " + err);
            conn.release();
            rej("Query did not execute");
          });
      })
      .catch((err) => {
        console.log("DB Connection error");
        conn.release();
        rej("DB Connection error");
      });
  });
}

function deleteArticle(articleID) {
  dbQueryString = `
                    DELETE
                    FROM article
                    WHERE ArticleID = ${articleID}
                    `;
  return new Promise((res, rej) => {
    pool
      .getConnection()
      .then((conn) => {
        console.log("Deleting article with ID: " + articleID);
        conn
          .query(dbQueryString)
          .then((rows) => {
            console.log("Rows returned: " + rows.affectedRows);
            res(rows);
            conn.release();
          })
          .catch((err) => {
            console.log("DB Query Error: " + err);
            conn.release();
            rej("Query did not execute");
          });
      })
      .catch((err) => {
        console.log("DB Connection error");
        conn.release();
        rej("DB Connection error");
      });
  });
}

module.exports.validateUser = validateUser;
module.exports.addUser = addUser;
module.exports.getAllArticles = getAllArticles;
module.exports.getArticle = getArticle;
module.exports.updateArticle = updateArticle;
module.exports.addArticle = addArticle;
module.exports.deleteArticle = deleteArticle;
