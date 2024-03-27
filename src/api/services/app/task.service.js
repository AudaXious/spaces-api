import Campaigns from "../../../database/models/campaigns/campaign.js";
import { ErrMissingKeyFields, ErrResourceNotFound, ErrUnauthorized, ErrInvalidTaskData, ErrAlreadyParticipated } from "../../../errors/index.js";
import Task from "../../../database/models/tasks/task.js"
import TaskParticipants from "../../../database/models/tasks/taskParticipants.js";
import { checkIfUserBelongToASpace } from "../../utils/space.utils.js";
import { checkIfCampaignHasEnded } from "../../utils/campaign.utils.js";

const createTaskService = async (userId, userReq, campaignId) => {
  const {tasks, points} = userReq;

  const campaign = await Campaigns.findOne({
    uuid: campaignId,
  }).populate("space_id");

  if(!campaign) throw ErrResourceNotFound;
  
  if(campaign.space_id.creator_id.toString() !== userId) throw ErrUnauthorized;
  
  const allTasks = tasks.map(t =>({
    campaign_id : campaign._id,
    campaign_uuid : campaign.uuid,
    ...t
  }))

  await campaign.updateOne({
    points : points
  })

  const task = await Task.insertMany(allTasks);

  return task;
};

const participateInTasksService = async(taskId, campaignId, userId, spaceId)=>{

  await checkIfCampaignHasEnded(campaignId);

  const userID = await checkIfUserBelongToASpace(userId, spaceId)
  // fetches current task in view if exists
  // also fetches the count of tasks present in the campaign in view
  const result = await Task.aggregate([
    {
      $facet: {
        task: [
          { $match: { uuid: taskId, campaign_uuid: campaignId } },
          {
            $project: {
              _id: 1,
              uuid: 1,
              campaign_id: 1,
              campaign_uuid: 1,
              action: 1,
              url: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
        ],
        totalTasksCount: [
          { $match: { campaign_uuid: campaignId } },
          { $count: 'count' },
        ],
      },
    },
    {
      $project: {
        task: { $arrayElemAt: ['$task', 0] },
        totalTasksCount: { $arrayElemAt: ['$totalTasksCount.count', 0] },
      },
    },
  ]);

  if (result.length === 0 || !result[0].task) throw ErrResourceNotFound;



  console.log("Userid", userID)


  const participationStatus = await TaskParticipants.aggregate([
    { $match: { user_id: userID, campaign_uuid: campaignId } },
    {
      $group: {
        _id: null,
        completedTasks: { $push: '$task_id' },
        completedTaskCountForCampaign: { $sum: 1 },
      },
    },
  ]);

  const completedTasks = participationStatus.length > 0 ? participationStatus[0].completedTasks : [];
  // const currentTaskIsDone = completedTasks.includes(result[0].task._id.toString()); // You'll need to provide the current task ID here
  const currentTaskIsDone = completedTasks.some(taskId => taskId.equals(result[0].task._id));
  const completedTaskCountForCampaign = participationStatus.length > 0 ? participationStatus[0].completedTaskCountForCampaign : 0;

  console.log(completedTasks);
  console.log(currentTaskIsDone);
  console.log(result[0].task._id);

  const totalCampaignTaskCount = result[0].totalTasksCount;
  if (completedTaskCountForCampaign === totalCampaignTaskCount) throw new Error("All campaign tasks completed")
  else if (currentTaskIsDone) throw new Error("You have already done this task");
  
  const createParticipation = await TaskParticipants.create({
    user_id : userID,
    task_id : result[0].task._id,
    task_uuid : result[0].task.uuid,
    campaign_uuid : result[0].task.campaign_uuid
  })
  return createParticipation;
}

const getUserCompletedTasksForCampaignService = async(userId, campaignId)=>{
  const allCompletedTasks = await TaskParticipants.find({
    campaign_uuid : Number(campaignId),
    user_id : userId
  }).select("uuid");

  return allCompletedTasks;


}

const participateInAllTasksService = async(userId, campaignId,tasks, spaceId)=>{
  
  await checkIfCampaignHasEnded(campaignId);

  // await checkIfUserBelongToASpace(userId, spaceId)


  const result = await Task.find({
    campaign_uuid : campaignId,
  })


  if(result.length !== tasks.length) throw ErrInvalidTaskData;

  const participationStatus = await TaskParticipants.findOne({
    user_id :userId,
    campaign_uuid : campaignId,
  })

  if(participationStatus) throw ErrAlreadyParticipated;

  const dbTaskIds = result.map(task => task.uuid);
  const isValidTaskList = tasks.every(id => dbTaskIds.includes(id.uuid));

  if(!isValidTaskList) throw ErrInvalidTaskData;

  const allCompletedTasks = result.map(t => ({
    user_id : userId,
    task_id : t._id,
    task_uuid : t.uuid,
    campaign_uuid : t.campaign_uuid,
  }))

  
  const participateInMultipleTasks = await TaskParticipants.create(allCompletedTasks)

  return {taskCompleted : true, };
}

export const TaskService ={
    createTaskService,
    participateInTasksService,
    getUserCompletedTasksForCampaignService,
    participateInAllTasksService, 
}