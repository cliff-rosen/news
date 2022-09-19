console.log("starting");

const db = require("./db");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

console.log("starting");

app.use(cors());
//app.use(express.urlencoded({ limit: 2000000, extended: false }));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  console.log("get entries", Math.random());
  db.getAllEntries().then((rows) => res.json(rows));
});

app.get("/1", (req, res, next) => {
  console.log("1 requested");
  next();
});

app.get("/1", (req, res, next) => {
  console.log("1 requested, part 2");
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("init complete");
