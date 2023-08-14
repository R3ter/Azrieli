import { signToken } from "../../../../auth/Token";
import MovieModel from "../../../../models/MovieModel";

export default async (_, { id }, context): Promise<boolean> => {
  return await MovieModel.findOneAndDelete(id)
    .then(() => true)
    .catch((e) => {
      return false;
    });
};
