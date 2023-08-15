import { signToken } from "../../../../auth/Token";
import MovieModel from "../../../../models/MovieModel";
import Subscriptions from "../../../../models/Subscriptions";

export default async (_, { id }, context): Promise<boolean> => {
  await Subscriptions.deleteMany({ movie: id });
  return await MovieModel.findOneAndDelete(id)
    .then(() => true)
    .catch((e) => {
      return false;
    });
};
