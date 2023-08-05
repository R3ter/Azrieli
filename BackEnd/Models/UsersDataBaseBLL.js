const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("Users", UsersSchema);
