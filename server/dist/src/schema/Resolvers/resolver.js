"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddAccount_1 = __importDefault(require("./mutation/AddAccount"));
const EditMember_1 = __importDefault(require("./mutation/EditMember"));
const EditMovie_1 = __importDefault(require("./mutation/EditMovie"));
const RemoveMember_1 = __importDefault(require("./mutation/RemoveMember"));
const RemoveMovie_1 = __importDefault(require("./mutation/RemoveMovie"));
const createMember_1 = __importDefault(require("./mutation/createMember"));
const createMovie_1 = __importDefault(require("./mutation/createMovie"));
const login_1 = __importDefault(require("./mutation/login"));
const GetAllMovies_1 = __importDefault(require("./query/GetAllMovies"));
const getAllMembers_1 = __importDefault(require("./query/getAllMembers"));
const getAllSubs_1 = __importDefault(require("./query/getAllSubs"));
exports.default = {
    Query: {
        getAllSubs: getAllSubs_1.default,
        getAllMovies: GetAllMovies_1.default,
        getAllMembers: getAllMembers_1.default,
    },
    Mutation: {
        RemoveMember: RemoveMember_1.default,
        EditMember: EditMember_1.default,
        EditMovie: EditMovie_1.default,
        RemoveMovie: RemoveMovie_1.default,
        createMovie: createMovie_1.default,
        login: login_1.default,
        addAccount: AddAccount_1.default,
        createMember: createMember_1.default,
    },
};
//# sourceMappingURL=resolver.js.map