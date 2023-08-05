const jwt = require("jsonwebtoken");

require("dotenv").config();

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(401).json({ auth: false, msg: "No token" });

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    req.userData = decodedToken;
    if (err)
      return res.status(500).json({ err: err, msg: "Unable to verify token" });
    req.headers["isVerified"] = true;
    next();
  });
}

module.exports = { verifyToken };
