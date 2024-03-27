import { Schema, model } from "mongoose";


const claimedCampaignPointsSchema = new Schema(
  {
    campaign_id : {
        type : Schema.Types.ObjectId,
        ref : "Campaigns",
        unique : true,
    },
    user_id : {
        type : Schema.Types.ObjectId,
        ref : "Users",
    }
  },
  {
    timestamps: true,
    versionKey: false,
    // id: false,
  }
);
  
const ClaimedCampaignPoints = model("ClaimedCampaignPoints", claimedCampaignPointsSchema);

export default ClaimedCampaignPoints;
