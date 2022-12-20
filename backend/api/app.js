const db = require("../common/db");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { checkForToken, authenticateToken, createUser } = require("./authUtil");

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

app.get("/y", authenticateToken, function (req, res) {
  console.log("url", req.query);
  res.json({ message: "hello" });
});

app.post("/access", (req, res) => {
  console.log("Access");
  db.addLog(req);
  res.setHeader("Access-Control-Allow-Origin", "*");
  password = req.body.password;
  if (password === "letstrip") {
    console.log("access granted");
    res.json({ status: "ACCESS_GRANTED" });
  } else {
    console.log("access failed");
    res.status(401).json({ error: "Invalid password" });
  }
});

/////////////////////// LOGIN/REGISTRATION ////////////////////////////
app.post("/users", (req, res) => {
  console.log("Add user");
  db.addLog(req);

  res.setHeader("Access-Control-Allow-Origin", "*");
  userName = req.body.username;
  password = req.body.password;

  console.log(`Reg user with ${userName} / ${password} `);

  db.addUser(userName, password)
    .then((dbres) => {
      console.log("User created with UserID " + dbres.insertId);
      const user = createUser(parseInt(dbres.insertId), userName);
      res.json(user);
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

app.get("/users/:userid", checkForToken, (req, res) => {
  const { userid } = req.params;
  console.log("getting user: ", userid);

  if (userid != req.user.userID) {
    res.status(401).json({ error: "UNAUTHORIZED ACCESS" });
    return;
  }

  db.getUser(userid).then((rows) => {
    if (rows.length === 1) {
      res.json(rows[0]);
    } else if (rows.length === 0) {
      res.status(404).json({ error: "Entry not found" });
    } else {
      res.status(500);
    }
  });
});

/*
  success: 200 / user object
  wrong username/password: 401 / 
  unexpected error: 500
*/
app.post("/login", (req, res) => {
  console.log("Login");
  db.addLog(req);
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
        res.status(401).json({ error: "INVALID_LOGIN" });
      } else {
        console.log("Unexpected error", err.message);
        res.status(500).json({ error: "Unexpected error" });
      }
    })
    .finally(() => console.log("Back from validateUser()"));
});

/////////////////////// ATTRIBUTES/LOOKUPS ////////////////////////////

app.get("/entries/types", (req, res) => {
  console.log("getting entry types");
  db.getEntryTypes().then((dbres) => res.json(dbres));
});

app.get("/attribute/substance", (req, res) => {
  console.log("getting substances");
  db.getSubstances().then((dbres) => res.json(dbres));
});

app.get("/attribute/condition", (req, res) => {
  console.log("getting conditions");
  db.getConditions().then((dbres) => res.json(dbres));
});

/////////////////////// LOGGING ////////////////////////////

app.post("/entries/:entryid/logclick", checkForToken, (req, res) => {
  const { entryid } = req.params;
  console.log("logging entry click for: ", entryid);
  res.json({ result: "SUCCESS" });
});

app.post("/help", checkForToken, (req, res) => {
  console.log("logging help");
  res.json({ result: "SUCCESS" });
});

/////////////////////// ENTRY ////////////////////////////

app.get("/entries/:entryid", checkForToken, (req, res) => {
  const { entryid } = req.params;
  console.log("getting entry: ", entryid);
  db.getEntry(req.user.userID, entryid).then((rows) => {
    if (rows.length === 1) {
      res.json(rows[0]);
    } else if (rows.length === 0) {
      res.status(404).json({ error: "Entry not found" });
    } else {
      res.status(500);
    }
  });
});

app.get("/entries/url/:url", checkForToken, (req, res) => {
  const { url } = req.params;
  console.log("getting entry: ", url);
  db.getEntryByUrl(req.user.userID, url).then((rows) => {
    if (rows.length === 1) {
      res.json(rows[0]);
    } else if (rows.length === 0) {
      res.json({ status: "NOT_FOUND" });
    } else {
      res.status(500).json({ status: "SERVER_ERROR" });
    }
  });
});

app.post("/entries", authenticateToken, (req, res) => {
  console.log("adding entry", req.body.entryTitle);
  db.addEntry(
    req.user.userID,
    req.body.entryTypeID,
    req.body.entryTitle,
    req.body.entryText,
    req.body.entryUrl,
    req.body.substances,
    req.body.conditions
  )
    .then((dbres) => res.json({ entryID: Number(dbres.insertId) }))
    .catch((e) => {
      console.log("error", e);
      res.json({ error: e });
    });
});

app.put("/entries/:entryid", authenticateToken, (req, res) => {
  const { entryid } = req.params;
  console.log("updating entry", entryid);
  db.updateEntry(
    entryid,
    req.body.entryTypeID,
    req.body.entryTitle,
    req.body.entryText,
    req.body.entryUrl,
    req.body.substances,
    req.body.conditions
  )
    .then((dbres) => res.json({ result: "SUCCESS" }))
    .catch((e) => {
      console.log("error", e);
      res.json({ error: e });
    });
});

app.delete("/entries/:entryid", (req, res) => {
  const { entryid } = req.params;
  console.log("deleting entry", id);
  db.deleteEntry(id).then((result) => {
    console.log("result", typeof result);
    res.json({ res: "placeholder" });
    //res.json({ x: 1 });
  });
});

app.get("/entries", checkForToken, (req, res) => {
  const LIMIT = 20;
  const order = req.query.order;
  const start = Number(req.query.start) || 0;
  const limit = Number(req.query.limit) || LIMIT;
  const entrytypeids = req.query.entrytypeids;
  const substanceids = req.query.substanceids;
  const conditionids = req.query.conditionids;

  console.log("getting entries", req.query, start, limit);

  db.getFilteredEntries(
    req.user.userID,
    order,
    start,
    limit + 1,
    entrytypeids,
    substanceids,
    conditionids
  )
    .then((rows) => {
      console.log("rows: ", rows.length);
      var more = false;
      if (rows.length > limit) {
        rows.splice(-1);
        more = true;
      }

      res.json({
        rows: rows,
        start,
        limit,
        more,
      });
    })
    .catch((e) => res.json({ error: e.message }));
});

app.post("/entries/:entryid/vote/:value", authenticateToken, (req, res) => {
  console.log("entry vote from: ", req.user.userID);
  const { entryid, value } = req.params;
  db.addOrUpdateUserEntryVote(req.user.userID, entryid, value)
    .then((dbres) => res.json(dbres))
    .catch((e) => res.json({ error: e.message }));
});

app.post("/entries/:entryid/comments", authenticateToken, (req, res) => {
  const { entryid } = req.params;
  console.log("adding comment for entryid", entryid);
  db.addComment(
    req.user.userID,
    req.body.parentCommentID,
    entryid,
    req.body.commentText
  )
    .then((dbres) => res.json({ commentID: Number(dbres.insertId) }))
    .catch((e) => {
      console.log("error", e);
      res.json({ error: e });
    });
});

app.put("/entries/:entryid/comments", authenticateToken, (req, res) => {
  console.log("updating commentid", req.body.commentID);
  db.updateComment(req.body.commentID, req.body.commentText)
    .then((dbres) => res.json({ result: "SUCCESS" }))
    .catch((e) => {
      console.log("error", e);
      res.json({ error: e });
    });
});

app.get("/entries/:entryid/comments", checkForToken, (req, res) => {
  const { entryid } = req.params;
  console.log("getting comments for ", entryid);
  db.getEntryComments(req.user.userID, entryid)
    .then((rows) => res.json(rows))
    .catch((e) => {
      console.log("error", e);
      res.json({ error: e.message });
    });
});

app.post(
  "/entries/comments/:commentid/vote/:value",
  authenticateToken,
  (req, res) => {
    console.log("posting comment vote from: ", req.user.userID);
    const { commentid, value } = req.params;
    db.addOrUpdateUserCommentVote(req.user.userID, commentid, value)
      .then((dbres) => res.json(dbres))
      .catch((e) => res.json({ error: e.message }));
  }
);

app.post("/feedback", checkForToken, (req, res) => {
  console.log("add feedback");
  db.addFeedback(req)
    .then((dbres) => res.json({ result: "SUCCESS" }))
    .catch((e) => {
      console.log("error", e);
      res.json({ error: e });
    });
});

//////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

console.log("init complete");
