import mongoose from "mongoose";
import validator from "validator";

export interface IMembers {
  name: string;
  email: string;
  city: string;
}

const MembersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: (value) => {
      if (value.length > 0) return true;
      throw new Error("name of movie cant be empty");
    },
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
      if (validator.isEmail(value)) return true;
      throw new Error("email is invalid");
    },
  },
});

export default mongoose.model<IMembers>("Members", MembersSchema);
