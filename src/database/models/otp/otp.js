import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const otpSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    default: () => uuidV4(),
    unique: true,
  },
  user_uuid: {
    type: String,
    unique : true,
  },
  otpCode: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: 900,
    },
  },
});

const OTP = model("OTP", otpSchema);

export default OTP;
