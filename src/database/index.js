import mongoose from "mongoose";
import CONFIG from "../config/default.js"
import { createDefaultInviteCodes } from "./models/invites/invites.js";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(CONFIG.MONGODB_URI ?? "");

    console.log("MongoDB connection successful!");

    // await createDefaultInviteCodes() //uncomment this line to create invite codes
  } catch (error) {
    console.log("Failed to connect to Database: ", error);
    process.exit(1);
  }
};