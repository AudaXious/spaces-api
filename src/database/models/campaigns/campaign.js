import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";
import autoIncrement from 'mongoose-sequence';

// const connection = mongoose.createConnection('your-mongodb-uri');
const increment = autoIncrement(mongoose);

const campaignSchema = new Schema(
  {
    uuid: {
      type: Number,
      // required: true,
      // default: () => uuidV4(),
      unique: true,
    },
    space_id: {
      type: Schema.Types.ObjectId,
      ref: "Spaces",
      required: true,
    },
    space_uuid: {
      type: String,
      ref: "Spaces",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
      default : 0,
    },
    startDate : {
      type : Date,
      required : true,
    },
    endDate : {
      type : Date,
      required : true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.space_id;
        return ret;
      },
    },
  }
);

campaignSchema.plugin(increment, { id: 'uuid_seq', inc_field: 'uuid' });


const Campaigns = model("Campaigns", campaignSchema);

export default Campaigns;
