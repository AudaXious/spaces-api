import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const userSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
      default: () => uuidV4(),
      unique: true,
    },
    social_id: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default : false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("Users", userSchema);

export default User;
