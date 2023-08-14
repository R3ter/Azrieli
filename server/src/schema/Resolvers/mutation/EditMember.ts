import MembersModel from "../../../../models/MembersModel";
type AddMovieResult = {
  result: boolean;
  msg?: string;
};
export default async (
  _,
  { id, data: { name, city, email } },
  { req }
): Promise<AddMovieResult> => {
  //   checkToken(req.headers.token);
  return await MembersModel.findByIdAndUpdate(id, {
    $set: { city, email, name },
  })
    .then(() => ({ result: true }))
    .catch((error) => ({ msg: error.message, result: false }));
};
