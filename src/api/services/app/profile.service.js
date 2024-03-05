import User from "../../../database/models/user/user.js";
import {
  ErrResourceAlreadyExists,
  ErrUserNotFound,
} from "../../../errors/index.js";

const createUsernameService = async (userName, userId) => {
  const user = await User.findOne({
    username: userName,
  });

  if (user) throw ErrResourceAlreadyExists;

  const newUserName = await User.findOneAndUpdate(
    { _id: userId },
    { username: userName },
    { new: true }
  );
  const { email, username, ...userData } = newUserName;
  return { email, username };
};

export const ProfileService = {
  createUsernameService,
};
