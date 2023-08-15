import Subscriptions from "../../../../models/Subscriptions";

export default async (_, args, context) => {
  return await Subscriptions.find({}).populate("movie").populate("member");
};
