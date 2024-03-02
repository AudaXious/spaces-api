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
    unique : true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true ,
  },
},
  {
    timestamps: true,
  }
);

const Campaigns = model("Campaigns", campaignSchema);

export default Campaigns;
