const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./secrets.js");

/*
  user = {
    userID: USER_ID,
    userName: USER_NAME,
    token: JWT_TOKEN
  }
*/

function createUser(userID, userName) {
  console.log("authUtil.createUser", userID, userName);
  const user = { userID, userName };
  const token = jwt.sign(user, JWT_SECRET);
  user.token = token;
  return user;
}

function checkForToken(req, res, next) {
  console.log("Verifying token");

  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1] || "";
    console.log("Token found: " + bearerToken.substring(0, 10));
    req.token = bearerToken;
    jwt.verify(req.token, JWT_SECRET, (err, decoded) => {
      console.log(JSON.stringify(decoded));
      if (err) {
        console.log("Invalid JWT");
        req.user = { userID: -1 };
      } else {
        req.user = decoded;
        console.log("Valid JWT", req.user);
      }
      next();
    });
  } else {
    console.log("No JWT");
    req.user = { userID: 0 };
    next();
  }
}

function authenticateToken(req, res, next) {
  console.log("Verifying token");

  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1] || "";
    console.log("Token found: " + bearerToken.substring(0, 10));
    req.token = bearerToken;
    jwt.verify(req.token, JWT_SECRET, (err, decoded) => {
      console.log("token: ", JSON.stringify(decoded));
      if (err) {
        console.log("Invalid JWT");
        res.status(401).json({ error: "invalid authorization" });
      } else {
        req.user = decoded;
        console.log("Valid JWT", req.user);
        next();
      }
    });
  } else {
    console.log("No JWT");
    res.status(401).json({ error: "unauthorized" });
  }
}

module.exports.checkForToken = checkForToken;
module.exports.createUser = createUser;
module.exports.authenticateToken = authenticateToken;
