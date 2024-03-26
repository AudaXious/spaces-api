import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const taskSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    default: () => uuidV4(),
    unique: true,
  },
  campaign_id: {
    type: Schema.Types.ObjectId,
    ref: "Campaigns",
    required: true,
  },
  campaign_uuid: {
    type: Number,
    ref: "Campaigns",
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: ["share", "post", "like", "repost", "follow", "join"],
  },
  media: {
    type: String,
    required: true,
    enum: ["audaxious", "twitter"],
  },
  url :  {
    type : String,
    required : true,
  }
},
  {
    timestamps: true,
    versionKey : false,
    id: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.campaign_id;
        return ret;
      },
    },
  }
);

const Task = model("Task", taskSchema);

export default Task;
