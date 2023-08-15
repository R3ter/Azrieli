import mongoose from "mongoose";
import validator from "validator";

export interface ISubscription {
  movie: string;
  member: string;
}

const SubscriptionSchema = new mongoose.Schema(
  {
    movie: { required: true, type: mongoose.Types.ObjectId, ref: "Movie" },
    member: { required: true, type: mongoose.Types.ObjectId, ref: "Members" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISubscription>(
  "Subscription",
  SubscriptionSchema
);
