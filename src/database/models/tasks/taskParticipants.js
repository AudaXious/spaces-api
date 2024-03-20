import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const taskParticipantsSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    default: () => uuidV4(),
    unique: true,
  },
  task_id: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  task_uuid: {
    type: String,
    ref: "Task",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
    required: true,
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
        delete ret.campaign_id;
        return ret;
      },
    },
  }
);

const TaskParticipants = model("TaskParticipants", taskParticipantsSchema);

export default TaskParticipants;
