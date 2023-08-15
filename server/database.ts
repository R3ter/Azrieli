import mongoose from "mongoose";

export default async function () {
  console.log("connecting to database.....");
  return await mongoose.connect(
    "mongodb+srv://" +
      "R3ter:g0TtK9acQdS8nBAG" +
      "@cluster0.wvgdcdz.mongodb.net/?retryWrites=true&w=majority"
  )
}
