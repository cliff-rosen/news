const JWT_SECRET = "thisisthekey";
const db = require("./db");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = 4000;

console.log("starting");

app.use(cors());
//app.use(express.urlencoded({ limit: 2000000, extended: false }));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(start);

function start(req, res, next) {
  console.log("*************************************************");
  next();
}

/*
  success: 200 / user object
  wrong username/password: 401 / 
  unexpected error: 500
*/
app.post("/login", (req, res) => {
  console.log("Login");
  res.setHeader("Access-Control-Allow-Origin", "*");

  userName = req.body.username;
  password = req.body.password;

  console.log(`Logging in with ${userName} / ${password} `);
  db.validateUser(userName, password)
    .then((dbres) => {
      console.log("User validation success");
      jwt.sign(dbres.user, JWT_SECRET, (err, token) => {
        console.log("token = " + token);
        res.json({ userID: dbres.user.userID, token: token });
      });
    })
    .catch((err) => {
      if (
        err.message === "Invalid password" ||
        err.message === "Invalid username"
      ) {
        console.log("Login error", err.message);
        res.status(401).json({ error: "Login error" });
      } else {
        console.log("Unexpected error", err.message);
        res.status(500).json({ error: "Unexpected error" });
      }
    })
    .finally(() => console.log("Back from validateUser()"));
});

app.post("/entry", (req, res) => {
  console.log("add entry", req.body.entryText);
  db.addEntry(req.body.entryText, req.body.entryUrl).then((rows) =>
    res.json(rows[0])
  );
});

app.get("/entry", (req, res) => {
  console.log("get entry");
  db.getEntry().then((rows) => res.json(rows[0]));
});

app.delete("/entry/:id", (req, res) => {
  const { id } = req.params;
  console.log("get delete", id);
  db.deleteEntry(id).then((result) => {
    console.log("result", typeof result);
    res.json({ res: "placeholder" });
    //res.json({ x: 1 });
  });
});

app.get("/entries", (req, res) => {
  console.log("get entries", req.headers["authorization"]);
  db.getAllEntries().then((rows) => res.json(rows));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("init complete");
