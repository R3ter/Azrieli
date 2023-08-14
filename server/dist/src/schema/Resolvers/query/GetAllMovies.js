"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovieModel_1 = __importDefault(require("../../../../models/MovieModel"));
exports.default = async (_, { search }, context) => {
    return await MovieModel_1.default.find(search ? { name: { $regex: search, $options: "i" } } : {});
};
//# sourceMappingURL=GetAllMovies.js.map