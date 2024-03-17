import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const campaignSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
      default: () => uuidV4(),
      unique: true,
    },
    space_id: {
      type: Schema.Types.ObjectId,
      ref: "Spaces",
      required: true,
    },
    space_uuid: {
      type: String,
      ref: "Spaces",
      required: true,
    },
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.space_id;
        return ret;
      },
    },
  }
);

const Campaigns = model("Campaigns", campaignSchema);

export default Campaigns;
