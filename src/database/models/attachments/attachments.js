import { Schema, model } from "mongoose";

const attachmentSchema = new Schema(
  {
    space_id: {
      type: Schema.Types.ObjectId,
      ref: "Spaces",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    mime: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    label : {
      type : String,
      require : true,

    }
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

const Attachment = model("Attachments", attachmentSchema);

export default Attachment;
