const express = require("express");
const router = express.Router();
const BLL = require("../Models/UsersBLL");
require("dotenv").config();

const jwt = require("jsonwebtoken");

// localhost:8000/api/auth/login
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await BLL.getUser({ username, password });

  if (user.length > 0) {
    const userId = user._id;
    const RSA_PRIVATE_KEY = process.env.SECRET_KEY;
    const token = jwt.sign(
      { id: userId, email: user.username },
      RSA_PRIVATE_KEY,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({ auth: true, token: token, id: userId });
  } else {
    return res.status(401).send({ auth: false });
  }
});

module.exports = router;
