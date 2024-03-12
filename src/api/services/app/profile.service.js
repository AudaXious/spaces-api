import User from "../../../database/models/user/user.js";
import {
  ErrResourceAlreadyExists,
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
        username : userName,
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

export const ProfileService = {
  createUsernameService,
  getUserService,
};
