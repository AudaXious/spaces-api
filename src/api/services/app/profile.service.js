import User from "../../../database/models/user/user.js";
import {
  ErrResourceAlreadyExists,
  ErrResourceNotFound,
  ErrUserAlreadyHasUsername,
  ErrUserNotFound,
  ErrUsernameAlreadyExist,
} from "../../../errors/index.js";
import Username from "../../../database/models/user/username.js"

const createUsernameService = async (userName, userId) => {
  const user = await User.findOne({
    _id: userId,
  });

  if (!user) throw ErrUserNotFound;

  const [isUser, isUsername] =await Promise.all([
    await Username.findOne({
     user_id : user._id,
      }),
      await Username.findOne({
        username : { $regex: new RegExp(`^${userName}$`, "i") },
      })
    ]);

  if(isUser) throw ErrUserAlreadyHasUsername;
  if(isUsername) throw ErrUsernameAlreadyExist;
  
  const newUserName = await Username.create({
    user_id :user._id,
    username : userName,  
  }
  );
  return { user, username : newUserName.username };
};


const getUserService = async (userId) => {
  
  const user = await User.aggregate([
    { $match: { uuid: userId } },
    {
      $lookup: {
        from: "usernames",
        localField: "_id",
        foreignField: "user_id",
        as: "usernameData"
      }
    },
    {
      $lookup: {
        from: "points",
        localField: "_id",
        foreignField: "user_id",
        as: "pointsData"
      }
    },
    {
      $project: {
        _id: 0,
        uuid: 1,
        socialId: 1,
        walletId: 1,
        fullName: 1,
        email: 1,
        isVerified: 1,
        tags: 1,
        links: 1,
        username: { $cond: { if: { $eq: [{ $size: "$usernameData" }, 0] }, then: null, else: { $arrayElemAt: ["$usernameData.username", 0] } } },
        twitterUsername: { $cond: { if: { $eq: [{ $size: "$usernameData" }, 0] }, then: null, else: { $arrayElemAt: ["$usernameData.twitterUsername", 0] } } },
        points: { $cond: { if: { $eq: [{ $size: "$pointsData" }, 0] }, then: 0, else: { $arrayElemAt: ["$pointsData.points", 0] } } }
      }
    }
  ]);
  
  if (!user || user.length === 0) {
    throw ErrUserNotFound;
  }
  
  return user[0];
};

const changeUsernameService =  async (userReq, userId)=>{
  const {newUsername, prevUsername} = userReq;
  const oldUsername = await Username.findOne({
    user_id : userId,
    username : prevUsername,
  })

  if(!oldUsername) throw ErrResourceNotFound;

  const isUsername = await Username.findOne({
    username : { $regex: new RegExp(`^${newUsername}$`, "i") },
  });

  if(isUsername) throw ErrUsernameAlreadyExist;

  const updatedUsername = await Username.findOneAndUpdate({
    user_id : userId
  },{
    username : newUsername
  },
  {new : true}
  );

  return {username : updatedUsername.username};

}

export const ProfileService = {
  createUsernameService,
  getUserService,
  changeUsernameService
};
