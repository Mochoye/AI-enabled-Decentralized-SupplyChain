import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

















/*import mongoose from "mongoose";
import { DB_NAME } from "./constats";



(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
})(); */
