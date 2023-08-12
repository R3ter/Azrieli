import MovieModel from "../../../../models/MovieModel";

export default async (_, args, context) => {
  return await MovieModel.find({});
};
