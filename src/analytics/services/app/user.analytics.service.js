import Points from "../../../database/models/points/points.js";

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

export const UserAnalyticsService = {
    getGlobalLeaderShipBoardDataService
}