const mariadb = require("mariadb");
const { dbSecrets } = require("./secrets.js");

console.log("starting");

mariadb
  .createConnection({
    host: dbSecrets.DB_HOST,
    user: dbSecrets.DB_USER,
    password: dbSecrets.DB_PASSWORD,
    database: dbSecrets.DB_NAME,
  })
  .then((conn) => {
    conn
      .query(
        `
            INSERT
            INTO log (num)
            VALUES (1)
        `
      )
      .then((res) => {
        console.log("Result: ", res);
        conn.end();
      })
      .catch((err) => {
        console.log("error", err);
      });
  })
  .catch((err) => {
    console.log("error", err);
  });

console.log("done");
