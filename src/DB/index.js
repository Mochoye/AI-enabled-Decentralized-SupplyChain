import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(`\n "DB CONNECTED !! HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
};

export default connectDB