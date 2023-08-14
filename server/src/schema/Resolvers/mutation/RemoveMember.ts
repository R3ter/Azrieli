import { signToken } from "../../../../auth/Token";
import MembersModel from "../../../../models/MembersModel";

export default async (_, { id }, context): Promise<boolean> => {
  return await MembersModel.findOneAndDelete(id)
    .then(() => true)
    .catch((e) => {
      return false;
    });
};
