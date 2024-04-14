import SpacePoints from "../../../database/models/spaces/spacePointsRanking.js"
import Spaces from "../../../database/models/spaces/spaces.js"
import { ErrResourceNotFound } from "../../../errors/index.js"

const  getSpaceLeaderShipBoardDataService = async(spaceId)=>{

    const space = await Spaces.findOne({uuid : spaceId})

    if(!space) throw ErrResourceNotFound;

    const leaderBoard = await SpacePoints.find({
        space_id : space._id,
    }).populate("user_id")

    return leaderBoard;
}


export const SpaceAnalyticsService = {
    getSpaceLeaderShipBoardDataService,
}