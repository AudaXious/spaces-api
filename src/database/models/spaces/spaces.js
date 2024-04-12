import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";
import Campaigns from "../campaigns/campaign.js";


export const tag = [
  "DeFi", "NFT", "Metaverse", "Staking", "Meme", "Oracle", "DEX", "CEX", "DAO", 
  "GameFi","P2E","Community","DeSo", "SocialFi", "AI", "AMM", "ERC-20", "SPL"
]; 

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
  creator_uuid: {
    type: String,
    ref: "Users",
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique : true,
  },
  description: {
    type: String,
    required: true ,
  },
  tags : {
    type : [String],
    default : [],
  },
  // links : {
  //   type : [String],
  //   default : [],
  // },
  bannerUrl : String,
  iconUrl :  String,
  category : {
    type : String,
    enum : [...tag]
  },
  isVerified : {
    type : Boolean,
    default : false,
    required : true,
  }
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
        delete ret.creator_id;
        return ret;
      },
    },
  }
);

spaceSchema.pre('remove', async function(next) {
  try {
    // Remove all campaign documents where space_id matches the current space's uuid
    await Campaigns.deleteMany({ space_id: this._id });
    next();
  } catch (err) {
    next(err);
  }
});



const Spaces = model("Spaces", spaceSchema);

export default Spaces;
