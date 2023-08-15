import Subscriptions from "../../../../models/Subscriptions";

export default async (_, { id }) => {
  return await Subscriptions.findByIdAndDelete(id)
    .then(() => true)
    .catch(() => false);
};
