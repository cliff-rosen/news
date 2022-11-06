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

function setUserFromToken(req) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1] || "";
    console.log("Token found: " + bearerToken.substring(0, 10));
    req.token = bearerToken;
    jwt.verify(req.token, JWT_SECRET, (err, decoded) => {
      if (err) {
        req.user = { userID: -1 };
        console.log("Invalid JWT");
      } else {
        req.user = decoded;
        console.log("Valid JWT", req.user);
      }
    });
  } else {
    req.user = { userID: 0 };
    console.log("No JWT");
  }
}

function checkForToken(req, res, next) {
  console.log("Verifying token");
  setUserFromToken(req);
  next();
}

function authenticateToken(req, res, next) {
  console.log("Authorizing token");
  setUserFromToken(req);
  if (req.user.userID === -1) {
    console.log("authenticateToken: invalid token: ", req.user.userID);
    res.status(401).json({ error: "invalid token" });
  } else if (req.user.userID === 0) {
    console.log("authenticateToken: no token found", req.user.userID);
    res.status(401).json({ error: "authorization required" });
  } else {
    console.log("authenticateToken: authentication successful");
    next();
  }
}

module.exports.checkForToken = checkForToken;
module.exports.createUser = createUser;
module.exports.authenticateToken = authenticateToken;
