import AddAccount from "./mutation/AddAccount";
import EditMember from "./mutation/EditMember";
import EditMovie from "./mutation/EditMovie";
import RemoveMember from "./mutation/RemoveMember";
import RemoveMovie from "./mutation/RemoveMovie";
import createMember from "./mutation/createMember";
import createMovie from "./mutation/createMovie";
import createSub from "./mutation/createSub";
import login from "./mutation/login";
import GetAllMovies from "./query/GetAllMovies";
import getAllMembers from "./query/getAllMembers";
import getAllSubs from "./query/getAllSubs";
export default {
  Query: {
    getAllSubs,
    getAllMovies: GetAllMovies,
    getAllMembers,
  },
  Mutation: {
    createSub,
    RemoveMember,
    EditMember,
    EditMovie,
    RemoveMovie,
    createMovie,
    login: login,
    addAccount: AddAccount,
    createMember,
  },
};
