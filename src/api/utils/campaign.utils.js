import Campaigns from "../../database/models/campaigns/campaign.js";

export const checkIfCampaignHasEnded = async (campaignId)=>{
 try{
    const ended = await Campaigns.findOne({
        uuid : campaignId,
    })

    if(ended.endDate < new Date(Date.now())) throw new Error("Campaign has ended")
 }catch(error){
    throw error
 }
}