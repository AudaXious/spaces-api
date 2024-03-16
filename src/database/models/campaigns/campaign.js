import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const campaignSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    default: () => uuidV4(),
    unique: true,
  },
  space_id: {
    type: String,
    ref: "Spaces",
    required: true,
  },
  title: {
    type: String,
    require: true,
    unique : true,
  },
  description: {
    type: String,
    require: true ,
  },
},
  {
    timestamps: true,
    versionKey : false,
    id: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  }
);

const Campaigns = model("Campaigns", campaignSchema);

export default Campaigns;
