import Subscriptions from "../../../../models/Subscriptions";

export default async (_, { memberId, movieId }): Promise<boolean> => {
  return new Subscriptions({ MemberID: memberId, MovieID: movieId })
    .save()
    .then(() => true)
    .catch(() => false);
};
