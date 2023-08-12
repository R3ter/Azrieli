import { signToken } from "../../../../auth/Token";
import UserModel from "../../../../models/UserModel";
type AddAccountResult = {
  error: boolean;
  msg: string;
};
export default async (
  _,
  { userData: { name, username, password } },
  context
): Promise<AddAccountResult> => {
  return await new UserModel({ name, username, password })
    .save()
    .then((e) => {
      return {
        token: signToken({
          username,
          id: e._id,
          name,
        }),
        name,
        msg: "",
        error: false,
      };
    })
    .catch((error) => {
      if (error.name == "MongoServerError" && error.code == 11000) {
        return {
          error: true,
          msg: "username already exists!",
        };
      }
      if (error.name === "ValidationError")
        return {
          error: true,
          msg: error.errors[Object.keys(error.errors)[0]].message,
        };
      console.log(error);
    });
};
