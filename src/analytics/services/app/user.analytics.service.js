import Points from "../../../database/models/points/points.js";
import User from "../../../database/models/user/user.js";

/**
 * 
 */
const getGlobalLeaderShipBoardDataService = async (page)=>{
    const points = await Points.aggregate([
        {
          $lookup: {
            from: 'usernames', // Name of the collection in the database
            localField: 'user_id',
            foreignField: 'user_id',
            as: 'username',
          },
        },
        {
          $unwind: {
            path: '$username',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            user_id: 1,
            points: 1,
            username: '$username.username',
          },
        },
        {
          $sort: { points: -1 },
        },
      ]);
  
      return points;
}


/**
 * 
 * @returns 
 */
const getTotalNumberOfUserService = async()=>{
  const userTotal = await User.countDocuments();
  return {totalUsers : userTotal};
}

export const UserAnalyticsService = {
    getGlobalLeaderShipBoardDataService,
    getTotalNumberOfUserService
}