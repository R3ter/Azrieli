"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const MembersSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        validate: (value) => {
            if (value.length > 0)
                return true;
            throw new Error("name of movie cant be empty");
        },
    },
    city: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            if (validator_1.default.isEmail(value))
                return true;
            throw new Error("email is invalid");
        },
    },
});
exports.default = mongoose_1.default.model("Members", MembersSchema);
//# sourceMappingURL=MembersModel.js.map