import Attachment from "../../../database/models/attachments/attachments.js";
import Campaigns from "../../../database/models/campaigns/campaign.js";
import Spaces from "../../../database/models/spaces/spaces.js"
import { ErrInvalidDateSelection, ErrResourceAlreadyExists, ErrResourceNotFound, ErrUnauthorized, } from "../../../errors/index.js"
import uploadSingleMedia from "../storage/cloudinary.service.js";


const createCampaignAndTasksService = async(userReq, userId, spaceId, file)=>{
    const {title} = userReq;

    if(userReq.startDate > userReq.endDate) throw ErrInvalidDateSelection;

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

    let campaignIcon
    if(file && file['icon'] && file['icon'].length > 0) {
      console.log("Uploading Campaign Icon");
       campaignIcon = await uploadSingleMedia(file["icon"][0].buffer, "icon", campaign._id)

       await Attachment.create({
        item_id : campaign._id,
        user_id : userId,
        mime : file["icon"][0].mimetype,
        url : campaignIcon.secure_url,
      });
    }

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
          isVerified: '$space.isVerified',
          space_id : '$space._id',
        },
      },
      {
        $lookup: {
          from: 'claimedcampaignpoints',
          localField: '_id',
          foreignField: 'campaign_id',
          as: 'taskParticipants',
        },
      },
      {
        $lookup: {
          from: 'attachments',
          localField: '_id',
          foreignField: 'item_id',
          as: 'attachments',
        }
      },
      {
        $addFields: {
          iconUrl :  { $arrayElemAt: ['$attachments.url', 0] },
        },
      },
      //
      //
      {
        $lookup: {
            from: 'attachments',
            let: { space_id: '$space_id' },
            pipeline: [
                {
                    $match: {
                        $expr: { $eq: ['$item_id', '$$space_id'] },
                    },
                },
            ],
            as: 'spaceAttachments',
        },
      },
      {
        $addFields: {
            spaceIconUrl: { $ifNull: [{ $arrayElemAt: ['$spaceAttachments.url', 0] }, null] },
            spaceBannerUrl: { $ifNull: [{ $arrayElemAt: ['$spaceAttachments.url', 1] }, null] },
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          points: 1,
          endDate: 1,
          iconUrl : 1,
          taskCount: { $size: '$tasks' },
          space_title: 1,
          space_uuid: 1,
          spaceIconUrl : 1,
          spaceBannerUrl : 1,
          isVerified : 1,
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
          space_id: '$space._id',
          isVerified: '$space.isVerified'
        },
      },
      {
        $lookup: {
          from: 'claimedcampaignpoints',
          localField: '_id',
          foreignField: 'campaign_id',
          as: 'taskParticipants',
        },
      },
      {
        $lookup: {
          from: 'attachments',
          localField: '_id',
          foreignField: 'item_id',
          as: 'attachments',
        }
      },
      {
        $addFields: {
          iconUrl :  { $arrayElemAt: ['$attachments.url', 0] },
        },
      },
      //
      {
        $lookup: {
            from: 'attachments',
            let: { space_id: '$space_id' },
            pipeline: [
                {
                    $match: {
                        $expr: { $eq: ['$item_id', '$$space_id'] },
                    },
                },
            ],
            as: 'spaceAttachments',
        },
    },
    {
      $addFields: {
          spaceIconUrl: { $ifNull: [{ $arrayElemAt: ['$spaceAttachments.url', 0] }, null] },
          spaceBannerUrl: { $ifNull: [{ $arrayElemAt: ['$spaceAttachments.url', 1] }, null] },
      },
    },
      //
      {
        $project: {
          title: 1,
          description: 1,
          points: 1,
          endDate: 1,
          iconUrl: 1,
          taskCount: { $size: '$tasks' },
          space_title: 1,
          space_uuid: 1,
          spaceIconUrl : 1,
          spaceBannerUrl : 1,
          isVerified : 1,
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
            space_id: '$space._id',
            isVerified: '$space.isVerified'
          },
        },
        {
          $lookup: {
            from: 'claimedcampaignpoints',
            localField: '_id',
            foreignField: 'campaign_id',
            as: 'taskParticipants',
          },
        },
        {
          $lookup: {
            from: 'attachments',
            localField: '_id',
            foreignField: 'item_id',
            as: 'attachments',
          }
        },
        {
          $addFields: {
            iconUrl :  { $arrayElemAt: ['$attachments.url', 0] },
          },
        },
        {
          $lookup: {
              from: 'attachments',
              let: { space_id: '$space_id' },
              pipeline: [
                  {
                      $match: {
                          $expr: { $eq: ['$item_id', '$$space_id'] },
                      },
                  },
              ],
              as: 'spaceAttachments',
          },
        },
        {
          $addFields: {
              spaceIconUrl: { $ifNull: [{ $arrayElemAt: ['$spaceAttachments.url', 0] }, null] },
              spaceBannerUrl: { $ifNull: [{ $arrayElemAt: ['$spaceAttachments.url', 1] }, null] },
          },
        },
        {
          $project: {
            title: 1,
            description: 1,
            points: 1,
            endDate: 1,
            iconUrl : 1,
            taskCount: { $size: '$tasks' },
            space_title: 1,
            space_uuid: 1,
            spaceIconUrl : 1,
            spaceBannerUrl : 1,
            isVerified : 1,
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
    createCampaignAndTasksService,
    getAllSpacesCampaignService,
    getACampaignService,
    getCampaignsService
}