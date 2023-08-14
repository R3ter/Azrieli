"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MembersModel_1 = __importDefault(require("../../../../models/MembersModel"));
exports.default = async (_, { id, data: { name, city, email } }, { req }) => {
    //   checkToken(req.headers.token);
    return await MembersModel_1.default.findByIdAndUpdate(id, {
        $set: { city, email, name },
    })
        .then(() => ({ result: true }))
        .catch((error) => ({ msg: error.message, result: false }));
};
//# sourceMappingURL=EditMember.js.map