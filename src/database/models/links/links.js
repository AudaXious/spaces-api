import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";


const linksSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    default: () => uuidV4(),
    unique: true,
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  owner_uuid: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum : ["twitter","telegram", "website"]
  },
  url: {
    type: String,
    required: true ,
  },
},
  {
    timestamps: true,
    versionKey : false,
    id:false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // ret.id = ret._id;
        delete ret._id;
        delete ret.owner_id;
        return ret;
      },
    },
  }
);

const Links = model("Links", linksSchema);

export default Links;
