import Campaigns from "../../../database/models/campaigns/campaign.js";
import ClaimedCampaignPoints from "../../../database/models/campaigns/claimedCampaignPoints.js";
import Points from "../../../database/models/points/points.js";
import SpacesMembers from "../../../database/models/spaces/spaceMembers.js";
import SpacePoints from "../../../database/models/spaces/spacePointsRanking.js";
import { ErrMemberNotFound, ErrResourceNotFound, ErrPointsAlreadyClaimed } from "../../../errors/index.js";

const claimTasksPointsService = async(userId, campaignId)=>{
    const campaign = await Campaigns.findOne({
        uuid : Number(campaignId),
    })

    if(!campaign) throw ErrResourceNotFound;

    const isMemberOfSpace = await SpacesMembers.findOne({
        space_id : campaign.space_id,
        user_id : userId
    });

    if(!isMemberOfSpace) throw ErrMemberNotFound

    const hasClaimedPoints = await ClaimedCampaignPoints.findOne({
        campaign_id : campaign._id,
        user_id : userId
    });

    if(hasClaimedPoints) throw ErrPointsAlreadyClaimed;

    await Promise.all([
        await Points.updatePoints(userId, campaign.points),
        //
        await ClaimedCampaignPoints.create({
            campaign_id : campaign._id,
            user_id : userId,
        }),
        //
        await SpacePoints.findOneAndUpdate(
            {
              user_id: userId,
              space_id: campaign.space_id,
            },
            {
              $inc: { points: 20 } // Increment points by 20 (or any other value)
            },
            {
              upsert: true, // Create a new document if no document matches the query
              new: true, // Return the modified document rather than the original
              setDefaultsOnInsert: true, // Apply defaults when creating a new document
            }
        ),

    ])

    return;
}


export const PointsService = {
    claimTasksPointsService
};