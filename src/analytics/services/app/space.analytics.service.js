import { Types } from "mongoose"
import SpacePoints from "../../../database/models/spaces/spacePointsRanking.js"
import Spaces from "../../../database/models/spaces/spaces.js"
import { ErrResourceNotFound } from "../../../errors/index.js"

const  getSpaceLeaderShipBoardDataService = async(spaceId)=>{

    const space = await Spaces.findOne({uuid : spaceId})

    if(!space) throw ErrResourceNotFound;

    // const leaderBoard = await SpacePoints.find({
    //     space_id : space._id,
    // }).populate("user_id")

    // return leaderBoard;

    const __id = new Types.ObjectId("6609f6f0d65b46ae84cb318a")

    const spacePoints = await SpacePoints.aggregate([
        { $match: { space_id: __id } },
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
            username: "$username_info.username",
            totalPoints: { $sum: "$points" },
          },
        },
        { $sort: { totalPoints: -1 } },
      ]);
  
      return spacePoints;
}


export const SpaceAnalyticsService = {
    getSpaceLeaderShipBoardDataService,
}