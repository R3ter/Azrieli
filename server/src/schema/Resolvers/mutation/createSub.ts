import Subscriptions from "../../../../models/Subscriptions";

export default async (_, { memberId, movieId }): Promise<boolean> => {
  return new Subscriptions({
    member: memberId,
    movie: movieId,
  })
    .save()
    .then(() => true)
    .catch(() => false);
};
