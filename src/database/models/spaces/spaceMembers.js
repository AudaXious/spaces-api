import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const spaceMemberSchema = new Schema({
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
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
},
  {
    timestamps: true,
    versionKey : false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

const SpacesMembers = model("Space_Members", spaceMemberSchema);

export default SpacesMembers;
