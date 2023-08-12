import MembersModel from "../../../../models/MembersModel";

export default async (_, args, context) => {
  return await MembersModel.find({});
};
