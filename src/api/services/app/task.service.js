import Campaigns from "../../../database/models/campaigns/campaign.js";
import { ErrUnauthorized } from "../../../errors/index.js";

const createTaskService = async (userId, userReq, campaignId) => {
  const campaign = await Campaigns.findOne({
    uuid: campaignId,
  }).populate("space_id");

  if(campaign.space_id.creator_id.toString() !== userId) throw ErrUnauthorized;
  
  console.log(campaign);
};


export const TaskService ={
    createTaskService,
}