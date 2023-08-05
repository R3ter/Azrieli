const mongoose = require("mongoose");

const MoviesSchema = mongoose.Schema({
  name: String,
  year: String,
  Genres: String,
  image: String,
  subscribers: [String],
});

module.exports = mongoose.model("Movies", MoviesSchema);
