import mongoose from "mongoose";
import CONFIG from "../config/default.js"

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(CONFIG.MONGODB_URI ?? "");

    console.log("MongoDB connection successful!");
  } catch (error) {
    console.log("Failed to connect to Database: ", error);
    process.exit(1);
  }
};