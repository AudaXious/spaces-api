import Campaigns from "../../../database/models/campaigns/campaign.js";
import { ErrResourceNotFound, ErrUnauthorized } from "../../../errors/index.js";
import Task from "../../../database/models/tasks/task.js"

const createTaskService = async (userId, userReq, campaignId) => {
  const campaign = await Campaigns.findOne({
    uuid: campaignId,
  }).populate("space_id");

  if(!campaign) throw ErrResourceNotFound;
  
  if(campaign.space_id.creator_id.toString() !== userId) throw ErrUnauthorized;
  
  const task = await Task.create({
    campaign_id : campaign._id,
    campaign_uuid : campaign.uuid,
    ...userReq,
  });

  return task;
};

const participateInTasksService = async(taskId)=>{
  const task = await Task.findOne({
    uuid : taskId,
  }).populate("campaign_id");

  if(!task) throw ErrResourceNotFound;

  console.log(task);
}

export const TaskService ={
    createTaskService,
    participateInTasksService,
}
