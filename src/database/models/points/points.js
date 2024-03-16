import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const pointSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    default: () => uuidV4(),
    unique: true,
  },
  user_id: {
    type: String,
    ref: "Users",
    required: true,
    unique : true,
  },
  points: {
    type: Number,
    require: true,
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

const Points = model("Points", pointSchema);

export default Points;
