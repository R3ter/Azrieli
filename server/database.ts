import mongoose from "mongoose";

export default async function () {
  console.log("connecting to database.....");
  return await mongoose.connect(
    "mongodb+srv://" +
      process.env.DBPASS +
      "@cluster0.wvgdcdz.mongodb.net/?retryWrites=true&w=majority"
  );
}
