import { checkToken } from "../../../../auth/Token";
import MovieModel from "../../../../models/MovieModel";
type AddMovieResult = {
  result: boolean;
  msg?: string;
};
export default async (
  _,
  { id, data: { name, ImageUrl, yearPremiered, genres } },
  { req }
): Promise<AddMovieResult> => {
  //   checkToken(req.headers.token);
  return await MovieModel.findByIdAndUpdate(id, {
    $set: { name, ImageUrl, yearPremiered, genres },
  })
    .then(() => ({ result: true }))
    .catch((error) => ({ msg: error.message, result: false }));
};
