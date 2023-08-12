import mongoose from "mongoose";
import validator from "validator";

export interface ISubscription {
  MovieID: string;
  MemberID: string;
}

const SubscriptionSchema = new mongoose.Schema(
  {
    movie: { type: mongoose.Types.ObjectId, ref: "Movie" },
    member: { type: mongoose.Types.ObjectId, ref: "Member" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISubscription>(
  "Subscription",
  SubscriptionSchema
);
