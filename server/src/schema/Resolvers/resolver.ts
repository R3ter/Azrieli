import AddAccount from "./mutation/AddAccount";
import createMember from "./mutation/createMember";
import createMovie from "./mutation/createMovie";
import login from "./mutation/login";
import GetAllMovies from "./query/GetAllMovies";
import getAllMembers from "./query/getAllMembers";

export default {
  Query: {
    getAllMovies: GetAllMovies,
    getAllMembers,
  },
  Mutation: {
    createMovie,
    login: login,
    addAccount: AddAccount,
    createMember,
  },
};
