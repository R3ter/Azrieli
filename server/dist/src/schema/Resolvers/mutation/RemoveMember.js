"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MembersModel_1 = __importDefault(require("../../../../models/MembersModel"));
const Subscriptions_1 = __importDefault(require("../../../../models/Subscriptions"));
exports.default = async (_, { id }, context) => {
    await Subscriptions_1.default.deleteMany({ member: id });
    return await MembersModel_1.default.findOneAndDelete(id)
        .then(() => true)
        .catch((e) => {
        return false;
    });
};
//# sourceMappingURL=RemoveMember.js.map