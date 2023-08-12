import MembersModel from "../../../../models/MembersModel";
type AddMemberResult = {
  result: boolean;
  msg?: string;
};
export default async (
  _,
  { memberInput: { name, city, email } }
): Promise<AddMemberResult> => {
  return await new MembersModel({ name, city, email })
    .save()
    .then(() => ({ result: true }))
    .catch((error) => ({ msg: error.message, result: false }));
};
