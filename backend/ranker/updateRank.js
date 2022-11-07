const mariadb = require("mariadb");
const { dbSecrets } = require("../common/secrets.js");

console.log("starting");

async function getConnection() {
  return mariadb.createConnection({
    host: dbSecrets.DB_HOST,
    user: dbSecrets.DB_USER,
    password: dbSecrets.DB_PASSWORD,
    database: dbSecrets.DB_NAME,
  });
}

async function doUpdateRank() {
  const conn = await getConnection();
  const res = await conn.query(
    `
      UPDATE entry
      SET Rank = (
        SELECT 100 * (1 + VoteCount + CommentCount) 
          / POWER(TIMESTAMPDIFF(DAY, EntryDateTime, NOW()) + 1, 1.8)
      )
    `
  );
  console.log("Rank updated:", res);
  console.log("done");
}

doUpdateRank();
