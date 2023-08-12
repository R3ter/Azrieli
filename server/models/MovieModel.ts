import mongoose from "mongoose";
import validator from "validator";

export interface IMovie {
  name: string;
  yearPremiered: number;
  genres: [string];
  ImageUrl: string;
}

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: (value) => {
      if (value.length > 0) return true;
      throw new Error("name of movie cant be empty");
    },
  },
  ImageUrl: {
    type: String,
    validate: (value) => {
      if (validator.isURL(value)) return true;
      throw new Error("the provided image url is not valid");
    },
    required: true,
  },

  yearPremiered: {
    type: Number,
    required: true,
  },
  genres: {
    type: Array<string>,
  },
});

export default mongoose.model<IMovie>("Movie", movieSchema);
