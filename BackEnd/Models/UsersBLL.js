const Users = require("./UsersDataBaseBLL");

const getUser = async ({ username, password }) => {
  const User = await Users.find({ username, password });
  return User;
};

const addUser = async (obj) => {
  const newUser = new Users(obj);
  await newUser.save();
  return "Created";
};

module.exports = { getUser, addUser };
