import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const spaceSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    default: () => uuidV4(),
    unique: true,
  },
  creator_id: {
    type: String,
    ref: "Users",
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

const Spaces = model("Spaces", spaceSchema);

export default Spaces;
