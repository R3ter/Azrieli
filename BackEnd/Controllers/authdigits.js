const express = require("express");
const router = express.Router();
const { totp, authenticator } = require("otplib");
const nodemailer = require("nodemailer");
const { verifyToken } = require("../Middlewares/verifyToken");
require("dotenv").config();

const secret = authenticator.generateSecret();
totp.options = { step: 30 };

router.get("/sendCode", verifyToken, async (req, res) => {
  const userEmail = req.userData.email;
  console.log(req.userData);
  try {
    const token = totp.generate(secret);
    let mailOptions = {
      from: process.env.EmailtoSendEmails,
      to: userEmail,
      subject: "verify code",
      text: `Your Code is ${token}`,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AuthUser,
        pass: process.env.AuthPass,
      },
    });

    let info = await transporter.sendMail(mailOptions);
    console.log(token);
    return res.send(token);
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/verify/:token", (req, res) => {
  const token = req.params.token;
  const isValid = totp.verify({ token, secret });
  res.send(isValid);
});

module.exports = router;
