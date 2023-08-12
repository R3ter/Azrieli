import mongoose from "mongoose";
import validator from "validator";

export interface IUser {
  name: string;
  password: string;
  username: string;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
      if (value.length >= 5) return true;
      throw new Error("username must be 5 or higher char long");
    },
  },
  name: {
    type: String,
    validate: (value) => {
      return !/[0-9]/.test(value);
    },
    required: true,
    maxlength: 50,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
    validate: (value) => {
      if (value.length < 8) {
        throw new Error("password must be at least 8 characters");
      }
      return true;
    },
  },
});

export default mongoose.model<IUser>("users", userSchema);
