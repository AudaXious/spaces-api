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
  }
);

const Username = model("Username", usernameSchema);

export default Username;
