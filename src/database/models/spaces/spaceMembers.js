import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const spaceMemberSchema = new Schema({
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
    unique : true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    unique : true,
  },
},
  {
    timestamps: true,
  }
);

const SpacesMembers = model("Space_Members", spaceMemberSchema);

export default SpacesMembers;
