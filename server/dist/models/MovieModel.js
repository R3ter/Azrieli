"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const movieSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        validate: (value) => {
            if (value.length > 0)
                return true;
            throw new Error("name of movie cant be empty");
        },
    },
    ImageUrl: {
        type: String,
        validate: (value) => {
            if (validator_1.default.isURL(value))
                return true;
            throw new Error("the provided image url is not valid");
        },
        required: true,
    },
    yearPremiered: {
        type: Number,
        required: true,
    },
    genres: {
        type: (Array),
    },
});
exports.default = mongoose_1.default.model("Movie", movieSchema);
//# sourceMappingURL=MovieModel.js.map