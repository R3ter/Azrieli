import { signToken } from "../../../../auth/Token";
import MembersModel from "../../../../models/MembersModel";
import Subscriptions from "../../../../models/Subscriptions";

export default async (_, { id }, context): Promise<boolean> => {
  await Subscriptions.deleteMany({ member: id });
  return await MembersModel.findOneAndDelete(id)
    .then(() => true)
    .catch((e) => {
      return false;
    });
};
