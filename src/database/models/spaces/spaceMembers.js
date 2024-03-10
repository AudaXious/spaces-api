import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const spaceMemberSchema = new Schema({
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
},
  {
    timestamps: true,
  }
);

const SpacesMembers = model("Space_Members", spaceMemberSchema);

export default SpacesMembers;
