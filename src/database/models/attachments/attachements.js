import { Schema, model } from "mongoose";
// import { v4 as uuidV4 } from "uuid";

const attachmentSchema = new Schema(
  {
    spaceId: {
      type: Schema.Types.ObjectId,
      ref: "Spaces",
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      unique: true,
    },
    mime: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attachment = model("Users", attachmentSchema);

export default Attachment;
