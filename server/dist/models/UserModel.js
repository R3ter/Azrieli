"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            if (value.length >= 5)
                return true;
            throw new Error("username must be 5 or higher char long");
        },
    },
    name: {
        type: String,
        validate: (value) => {
            return !/[0-9]/.test(value);
        },
        required: true,
        maxlength: 50,
        minlength: 4,
    },
    password: {
        type: String,
        required: true,
        validate: (value) => {
            if (value.length < 8) {
                throw new Error("password must be at least 8 characters");
            }
            return true;
        },
    },
});
exports.default = mongoose_1.default.model("users", userSchema);
//# sourceMappingURL=UserModel.js.map