"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovieModel_1 = __importDefault(require("../../../../models/MovieModel"));
exports.default = async (_, { id, data: { name, ImageUrl, yearPremiered, genres } }, { req }) => {
    //   checkToken(req.headers.token);
    return await MovieModel_1.default.findByIdAndUpdate(id, {
        $set: { name, ImageUrl, yearPremiered, genres },
    })
        .then(() => ({ result: true }))
        .catch((error) => ({ msg: error.message, result: false }));
};
//# sourceMappingURL=EditMovie.js.map