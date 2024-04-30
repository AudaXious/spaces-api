import Campaigns from "../../database/models/campaigns/campaign.js";
import { ErrCampaignHasEnded, ErrResourceNotFound } from "../../errors/index.js";

export const checkIfCampaignHasEnded = async (campaignId)=>{
 try{
    const ended = await Campaigns.findOne({
        uuid : campaignId,
    })
    if(!ended) throw ErrResourceNotFound;
    if(ended.endDate < new Date(Date.now())) throw ErrCampaignHasEnded;
 }catch(error){
    throw error
 }
}