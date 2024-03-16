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
        space_id : space.uuid,
    });

    if(isCampaign) throw ErrResourceAlreadyExists;

    const campaign = await Campaigns.create({
        ...userReq,
        space_id : space.uuid,
    });

    return campaign.toJSON();
    
}
export const  CampaignService = {
    createCampaignService,
}