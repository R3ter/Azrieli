"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../../../../auth/Token");
const UserModel_1 = __importDefault(require("../../../../models/UserModel"));
exports.default = async (_, { userData: { name, username, password } }, context) => {
    return await new UserModel_1.default({ name, username, password })
        .save()
        .then((e) => {
        return {
            token: (0, Token_1.signToken)({
                username,
                id: e._id,
                name,
            }),
            name,
            msg: "",
            error: false,
        };
    })
        .catch((error) => {
        if (error.name == "MongoServerError" && error.code == 11000) {
            return {
                error: true,
                msg: "username already exists!",
            };
        }
        if (error.name === "ValidationError")
            return {
                error: true,
                msg: error.errors[Object.keys(error.errors)[0]].message,
            };
        console.log(error);
    });
};
//# sourceMappingURL=AddAccount.js.map