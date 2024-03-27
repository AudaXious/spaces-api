import { Schema, model } from "mongoose";

const spacePointSchema = new Schema({
  user_id : {
    type : Schema.Types.ObjectId,
    ref : "Users",
    required: true,

  },
  points: {
    type: Number,
    required: true,
    default : 0
  },
  space_id : {
    type : Schema.Types.ObjectId,
    ref : "Users",
    required: true,
  },
},
  {
    timestamps: true,
    versionKey : false,
    id : false,
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

const SpacePoints = model("SpacePoints", spacePointSchema);

export default SpacePoints;
