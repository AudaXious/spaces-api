import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const spaceSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    default: () => uuidV4(),
    unique: true,
  },
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true ,
  },
  tags : {
    type : [String],
  },
  links : {
    type : [{
      name : String,
      url : String,
    }],
    default : []
  },
  bannerUrl : String,
  iconUrl :  String,
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

const Spaces = model("Spaces", spaceSchema);

export default Spaces;
