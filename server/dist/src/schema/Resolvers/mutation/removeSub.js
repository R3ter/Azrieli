"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Subscriptions_1 = __importDefault(require("../../../../models/Subscriptions"));
exports.default = async (_, { id }) => {
    return await Subscriptions_1.default.findByIdAndDelete(id)
        .then(() => true)
        .catch(() => false);
};
//# sourceMappingURL=removeSub.js.map