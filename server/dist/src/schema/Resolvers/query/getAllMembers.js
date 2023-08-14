"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MembersModel_1 = __importDefault(require("../../../../models/MembersModel"));
exports.default = async (_, args, context) => {
    return await MembersModel_1.default.find({});
};
//# sourceMappingURL=getAllMembers.js.map