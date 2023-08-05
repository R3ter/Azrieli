const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://waleed:xa61eHqJKvd7veUG@cluster0.wvgdcdz.mongodb.net/"
  )
  .then(() => console.log("Connected to DB"));
