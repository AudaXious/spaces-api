import { Schema, model } from "mongoose";
// import { v4 as uuidV4 } from "uuid";

const usernameSchema = new Schema(
  {
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
        unique : true,
    },
    username: {
      type: String,
      default :null,
    },
    twitterUsername : {
      type : String,
      default : null,
    }
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

const Username = model("Username", usernameSchema);

export default Username;
