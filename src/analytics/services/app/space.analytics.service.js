import { Types } from "mongoose"
import SpacePoints from "../../../database/models/spaces/spacePointsRanking.js"
import Spaces from "../../../database/models/spaces/spaces.js"
import { ErrResourceNotFound } from "../../../errors/index.js"

const  getSpaceLeaderShipBoardDataService = async(spaceId)=>{

    const space = await Spaces.findOne({uuid : spaceId})

    if(!space) throw ErrResourceNotFound;

    const spacePoints = await SpacePoints.aggregate([
        { $match: { space_id: space._id } },
        {
            $lookup: {
                from: "usernames",
                localField: "user_id",
                foreignField: "user_id",
                as: "username_info",
            },
        },
        {
            $unwind: "$username_info",
        },
        {
            $group: {
                _id: "$user_id",
                username: { $first: "$username_info.username" },
                totalPoints: { $sum: "$points" },
            },
        },
        { $sort: { totalPoints: -1 } },
        {
            $project: {
                _id: 0,
                username: 1,
                totalPoints: 1,
            },
        },
    ]);
      
    return spacePoints;
}


export const SpaceAnalyticsService = {
    getSpaceLeaderShipBoardDataService,
}