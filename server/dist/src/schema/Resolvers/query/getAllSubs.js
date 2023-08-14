"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriptions_1 = __importDefault(require("../../../../models/Subscriptions"));
exports.default = async (_, args, context) => {
    return await Subscriptions_1.default.find({}).populate("Movie").populate("Member");
};
//# sourceMappingURL=getAllSubs.js.map