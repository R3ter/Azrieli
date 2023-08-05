const movies = require("./MoviesBLL");

const subscribe = (id, userId) => {
  movies.updateOneMovie(id, {
    $push: { subscribers: userId },
  });
};
module.exports = {
  subscribe,
};
