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
    versionKey : false,
    id:false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

const Attachment = model("Users", attachmentSchema);

export default Attachment;
