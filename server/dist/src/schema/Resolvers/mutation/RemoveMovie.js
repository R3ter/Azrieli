"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovieModel_1 = __importDefault(require("../../../../models/MovieModel"));
const Subscriptions_1 = __importDefault(require("../../../../models/Subscriptions"));
exports.default = async (_, { id }, context) => {
    await Subscriptions_1.default.deleteMany({ movie: id });
    return await MovieModel_1.default.findOneAndDelete(id)
        .then(() => true)
        .catch((e) => {
        return false;
    });
};
//# sourceMappingURL=RemoveMovie.js.map