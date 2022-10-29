const db = require("./db");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const { checkForToken, createUser } = require("./authUtil");

const app = express();
const port = 4000;

console.log("starting");

app.use(cors());
//app.use(express.urlencoded({ limit: 2000000, extended: false }));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(start);

function start(req, res, next) {
  console.log("******************************");
  next();
}

/////////////////// PLAYGROUND /////////////////
let status = 0;

app.get("/y", checkForToken, function (req, res) {
  res.json({ message: "hello" });
});

app.post("/access", (req, res) => {
  console.log("Access");
  res.setHeader("Access-Control-Allow-Origin", "*");
  password = req.body.password;
  if (password === "letstrip") {
    console.log("access granted");
    res.send("access granted");
  } else {
    console.log("access failed");
    res.status(401).json({ error: "Invalid password" });
  }
});

/////////////////////// LOGIN/REGISTRATION ////////////////////////////
app.post("/createuser", (req, res) => {
  console.log("Create user");

  res.setHeader("Access-Control-Allow-Origin", "*");
  userName = req.body.username;
  password = req.body.password;

  console.log(`Reg user with ${userName} / ${password} `);

  db.addUser(userName, password)
    .then((dbres) => {
      console.log("User created with UserID " + dbres.insertId);
      const user = createUser(parseInt(dbres.insertId), userName);
      res.json(user);
      res.end();
    })
    .catch((err) => {
      console.log("createuser error", err);
      if (err == "DUPLICATE") {
        res.json({ error: "DUPLICATE" });
      } else {
        res.json({ error: "UNKNOWN" });
      }
    })
    .finally(console.log("Back from addUser()"));
});

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
      const user = createUser(dbres.user.userID, dbres.user.userName);
      res.json(user);
    })
    .catch((err) => {
      if (
        err.message === "Invalid password" ||
        err.message === "Invalid username"
      ) {
        console.log("Login error", err.message);
        res.status(401).json({ error: "Invalid username or password" });
      } else {
        console.log("Unexpected error", err.message);
        res.status(500).json({ error: "Unexpected error" });
      }
    })
    .finally(() => console.log("Back from validateUser()"));
});

/////////////////////// ENTRY ////////////////////////////
app.post("/entries", checkForToken, (req, res) => {
  console.log("add entry", req.body.entryText);
  db.addEntry(
    req.body.entryTitle,
    req.body.entryText,
    req.body.entryUrl,
    req.user.userID
  )
    .then((rows) => res.json(rows[0]))
    .catch((e) => res.json({ error: e }));
});

app.delete("/entries/:id", (req, res) => {
  const { id } = req.params;
  console.log("get delete", id);
  db.deleteEntry(id).then((result) => {
    console.log("result", typeof result);
    res.json({ res: "placeholder" });
    //res.json({ x: 1 });
  });
});

app.get("/entries", checkForToken, (req, res) => {
  const order = req.query.order;
  console.log("get entries", req.headers["authorization"]);
  db.getAllEntries(req.user.userID, order).then((rows) => res.json(rows));
});

app.post("/user_entry_vote", checkForToken, (req, res) => {
  console.log("add user_entry_vote", req.user.userID);
  db.addUserEntryVote(req.user.userID, req.body.entryID, req.body.vote)
    .then((rows) => res.json(rows[0]))
    .catch((e) => res.json({ error: e }));
});

app.put("/user_entry_vote", checkForToken, (req, res) => {
  console.log("update user_entry_vote", req.user.userID);
  db.updateUserEntryVote(req.user.userID, req.body.entryID, req.body.vote)
    .then((rows) => res.json(rows[0]))
    .catch((e) => res.json({ error: e }));
});

//////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("init complete");
