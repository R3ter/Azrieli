"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SubscriptionSchema = new mongoose_1.default.Schema({
    movie: { required: true, type: mongoose_1.default.Types.ObjectId, ref: "Movie" },
    member: { required: true, type: mongoose_1.default.Types.ObjectId, ref: "Members" },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Subscription", SubscriptionSchema);
//# sourceMappingURL=Subscriptions.js.map