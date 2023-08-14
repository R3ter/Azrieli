"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovieModel_1 = __importDefault(require("../../../../models/MovieModel"));
exports.default = async (_, { movieInput: { name, ImageUrl, yearPremiered, genres } }, { req }) => {
    //   checkToken(req.headers.token);
    return await new MovieModel_1.default({ name, ImageUrl, yearPremiered, genres })
        .save()
        .then(() => ({ result: true }))
        .catch((error) => ({ msg: error.message, result: false }));
};
//# sourceMappingURL=createMovie.js.map