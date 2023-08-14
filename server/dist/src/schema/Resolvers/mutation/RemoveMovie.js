"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovieModel_1 = __importDefault(require("../../../../models/MovieModel"));
exports.default = async (_, { id }, context) => {
    return await MovieModel_1.default.findOneAndDelete(id)
        .then(() => true)
        .catch((e) => {
        return false;
    });
};
//# sourceMappingURL=RemoveMovie.js.map