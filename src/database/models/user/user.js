import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";
import Spaces from "../spaces/spaces.js";

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
    walletId: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
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

userSchema.pre('remove', async function(next) {
  try {
    // Remove all Spaces documents where creator_id matches the current user's _id
    await Spaces.deleteMany({ creator_id: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

const User = model("Users", userSchema);

export default User;
