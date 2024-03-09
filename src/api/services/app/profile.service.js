import User from "../../../database/models/user/user.js";
import {
  ErrResourceAlreadyExists,
  ErrUserAlreadyHasUsername,
  ErrUserNotFound,
} from "../../../errors/index.js";
import Username from "../../../database/models/user/username.js"

const createUsernameService = async (userName, userId) => {
  const user = await User.findOne({
    _id: userId,
  });

  if (!user) throw ErrUserNotFound;

  const [isUser, isUsername] =await Promise.all([
    await Username.findOne({
     user_uuid : user.user_uuid,
      }),
      await Username.findOne({
        username : userName,
      })
    ]);

  if(isUser) throw ErrUserAlreadyHasUsername;
  if(isUsername) throw ErrResourceAlreadyExists;
  
  const newUserName = await Username.create({
    user_id :user._id,
    username : userName,  
  }
  );
  const {password, ...userData} = user;
  return { user, username : newUserName.username };
};

export const ProfileService = {
  createUsernameService,
};
