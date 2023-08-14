"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = ({ username, name, id }) => {
    if (!username || !id) {
        throw new Error("data is not provided correctly");
    }
    return jsonwebtoken_1.default.sign({ username, name, id }, process.env.SECRET || "dwadawdwadaadwawdawhfjawhfuawdwdwaawd");
};
exports.signToken = signToken;
const checkToken = (token) => {
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET || "dwadawdwadaadwawdawhfjawhfuawdwdwaawd");
    }
    catch (e) {
        throw new Error("Token is not valid");
    }
    return true;
};
exports.checkToken = checkToken;
//# sourceMappingURL=Token.js.map