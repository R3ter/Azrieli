const express = require("express");
const router = express.Router();
const BLL = require("../Models/SubscriptionsBLL");
const verifyToken = require("../Middlewares/verifyToken").verifyToken;

router.post("/", verifyToken, async (req, res) => {
  const id = req.body.id;
  const userId = req.userData.id;
  if (newSubscription) {
    const status = await BLL.subscribe(id, userId);
    return res.status(201).json(status);
  } else {
    return res.status(401).send({ auth: false });
  }
});

module.exports = router;
