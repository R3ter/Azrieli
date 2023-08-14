import Subscriptions from "../../../../models/Subscriptions";

export default async (_, args, context) => {
  return await Subscriptions.find({}).populate("Movie").populate("Member");
};
