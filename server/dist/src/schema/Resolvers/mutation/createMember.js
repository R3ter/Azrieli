"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MembersModel_1 = __importDefault(require("../../../../models/MembersModel"));
exports.default = async (_, { memberInput: { name, city, email } }) => {
    return await new MembersModel_1.default({ name, city, email })
        .save()
        .then(() => ({ result: true }))
        .catch((error) => ({ msg: error.message, result: false }));
};
//# sourceMappingURL=createMember.js.map