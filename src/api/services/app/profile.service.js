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
  const user = await User.findOne({
    _id : userId
  })

  if(!user) throw ErrUserNotFound;
  
  const username = await Username.findOne({
    user_id : userId,
  });

  return {
    ...user.toJSON(), 
    username : username ? username.username : null,
    twitterUsername : username? username.twitterUsername : null,
  }
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
