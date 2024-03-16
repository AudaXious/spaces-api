import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const userSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
      default: () => uuidV4(),
      unique: true,
    },
    socialId: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default : false,
    },
    tags :{
      type : [String],
      default : [],
    },
    links : [String],
  },
  {
    timestamps: true,
    versionKey : false,
    id: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  }
);

userSchema.statics.findOneOrCreate = async function findOneOrCreate(filter, doc) {
  let result = await this.findOne(filter);
  if (!result) {
    result = await this.create(doc);
  }
  return result;
};

const User = model("Users", userSchema);

export default User;
