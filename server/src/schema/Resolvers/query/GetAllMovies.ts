import MovieModel from "../../../../models/MovieModel";

export default async (_, { search }, context) => {
  return await MovieModel.find(
    search ? { name: { $regex: search, $options: "i" } } : {}
  );
};
