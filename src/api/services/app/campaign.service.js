import Campaigns from "../../../database/models/campaigns/campaign.js";
import Spaces from "../../../database/models/spaces/spaces.js"
import { ErrResourceAlreadyExists, ErrResourceNotFound, ErrUnauthorized } from "../../../errors/index.js"

const createCampaignService = async(userReq, userId, spaceId)=>{
    const {title} = userReq;
    const space = await Spaces.findOne({
       uuid : spaceId
    }).populate("creator_id")
    
    if(!space) throw ErrResourceNotFound;

    if(space.creator_id._id.toString() !== userId) throw ErrUnauthorized;

    const isCampaign = await Campaigns.findOne({
        title : { $regex: new RegExp(`^${title}$`, "i") },
        space_id : space._id,
    });

    if(isCampaign) throw ErrResourceAlreadyExists;

    const campaign = await Campaigns.create({
        ...userReq,
        space_id : space._id,
        space_uuid : space.uuid
    });

    return campaign.toJSON();
    
}

const getAllSpacesCampaignService = async(spaceId)=>{
    const space = await Spaces.findOne({
       uuid : spaceId
    })

    if(!space) throw ErrResourceNotFound;

    const campaigns = await Campaigns.aggregate([
      {
        $match: {
          space_id: space._id, // Match a specific campaign by its UUID
        },
      },
      {
        $lookup: {
          from: 'tasks',
          let: { campaign_uuid: '$uuid' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$campaign_uuid', '$$campaign_uuid'] },
              },
            },
          ],
          as: 'tasks',
        },
      },
      {
        $lookup: {
          from: 'spaces',
          localField: 'space_id',
          foreignField: '_id',
          as: 'space',
        },
      },
      {
        $unwind: '$space',
      },
      {
        $addFields: {
          space_title: '$space.title',
          space_uuid: '$space.uuid',
        },
      },
      {
        $lookup: {
          from: 'taskparticipants',
          localField: 'uuid',
          foreignField: 'campaign_uuid',
          as: 'taskParticipants',
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          points: 1,
          endDate: 1,
          taskCount: { $size: '$tasks' },
          space_title: 1,
          space_uuid: 1,
          tasks: 1, 
          taskParticipantCount: { $size: '$taskParticipants' },
          uuid : 1,
          _id : 0,
        },
      },
    ]);

    return campaigns;
}

const getACampaignService = async(campaignId)=>{

     const campaign = await Campaigns.aggregate([
      {
        $match: {
          uuid: Number(campaignId), // Match a specific campaign by its UUID
        },
      },
      {
        $lookup: {
          from: 'tasks',
          let: { campaign_uuid: '$uuid' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$campaign_uuid', '$$campaign_uuid'] },
              },
            },
          ],
          as: 'tasks',
        },
      },
      {
        $lookup: {
          from: 'spaces',
          localField: 'space_id',
          foreignField: '_id',
          as: 'space',
        },
      },
      {
        $unwind: '$space',
      },
      {
        $addFields: {
          space_title: '$space.title',
          space_uuid: '$space.uuid',
        },
      },
      {
        $lookup: {
          from: 'taskparticipants',
          localField: 'uuid',
          foreignField: 'campaign_uuid',
          as: 'taskParticipants',
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          points: 1,
          endDate: 1,
          taskCount: { $size: '$tasks' },
          space_title: 1,
          space_uuid: 1,
          tasks: 1,
          taskParticipantCount: { $size: '$taskParticipants' }, 
          uuid : 1,
          _id : 0,
        },
      },
    ]);
     
     if(!campaign) throw ErrResourceNotFound;
     return campaign[0];
}

//
const getCampaignsService = async()=>{
   
    const campaignsWithTaskCountAndSpaceDetails = await Campaigns.aggregate([
        {
          $lookup: {
            from: 'tasks',
            let: { campaign_uuid: '$uuid' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$campaign_uuid', '$$campaign_uuid'] },
                },
              },
            ],
            as: 'tasks',
          },
        },
        {
          $lookup: {
            from: 'spaces',
            localField: 'space_id',
            foreignField: '_id',
            as: 'space',
          },
        },
        {
          $unwind: '$space',
        },
        {
          $addFields: {
            space_title: '$space.title',
            space_uuid: '$space.uuid',
          },
        },
        {
          $lookup: {
            from: 'taskparticipants',
            localField: 'uuid',
            foreignField: 'campaign_uuid',
            as: 'taskParticipants',
          },
        },
        {
          $project: {
            title: 1,
            description: 1,
            points: 1,
            endDate: 1,
            taskCount: { $size: '$tasks' },
            space_title: 1,
            space_uuid: 1,
            tasks: 1, 
            taskParticipantCount: { $size: '$taskParticipants' },
            uuid : 1,
            _id : 0,
          },
        },
      ]);
  
      return campaignsWithTaskCountAndSpaceDetails;
}

export const  CampaignService = {
    createCampaignService,
    getAllSpacesCampaignService,
    getACampaignService,
    getCampaignsService
}