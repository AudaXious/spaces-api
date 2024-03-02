import User from "../../../database/models/user/user.js";
import OTP from "../../../database/models/otp/otp.js";
import {
  hashPassword,
  comparePassword,
  generateOTP,
  generateAndSendOTP,
} from "../../utils/auth.util.js";
import {
  ErrEmailAlreadyExists,
  ErrUserNotFound,
  ErrInvalidPassword,
  ErrInvalidOTP,
  ErrAccountNotVerified,
  ErrUnauthorized,
} from "../../../errors/index.js";

import { generateToken } from "../security/token.service.js";

/**
 * @description  This method creates a User Account
 * @param (userReq) i.e user attributes object
 * @returns user object
 */
const createUserAccountService = async (userReq) => {
  const { email, password } = userReq;

  const user = await User.findOne({ email: email });

  if (user) throw ErrEmailAlreadyExists;

  const hp = await hashPassword(password);

  const otp = generateOTP();

  const newUser = await User.create({
    ...userReq,
    password: hp,
    otpCode: otp,
  });

  const payload = {
    _id : newUser._id,
    uuid: newUser.uuid,
    isVerified : newUser.isVerified,
  };

  await generateAndSendOTP({ email, otp, flag: "verify" });

  const token = await generateToken(payload);

  return { user: newUser.uuid, token };
};

/**
 * @description  This method logs in an already registered User Account
 * @param (email, password) : string
 * @returns   user & token object
 */
const loginUserAccountService = async (email, password) => {
  const findUser = await User.findOne({
    email: { $regex: new RegExp(email, "i") },
  });
  if (!findUser) throw ErrUserNotFound;

  const passwordCompare = await comparePassword(password, findUser.password);
  if (!passwordCompare) throw ErrInvalidPassword;

  const payload = {
    _id : findUser._id,
    uuid: findUser.uuid,
    isVerified : findUser.isVerified,
  };

  const token = await generateToken(payload);

  return { findUser, token };
};

/**
 * @description  Verifies a received user otp with the otpCode stored in the database
 * @param (otp) : string
 * @returns   true
 */
const verifyUserOtpService = async (otp, email, type) => {
  const user = await User.findOne({ email: email });
  if (!user) throw ErrUserNotFound;
  let isOtp;

  // to handle forgot password otp verification...
  if (type === "forgot") {
    isOtp = await OTP.findOne({
      user_uuid: user.uuid,
      otpCode: otp,
    });
    if (!isOtp) throw ErrInvalidOTP;
  }
  //handle account verification only
  else {
    await user.updateOne({ isVerified: true });
    isOtp = await OTP.findOneAndDelete({
      otpCode: otp,
    });
    if (!isOtp) throw ErrInvalidOTP;
  }
  return user.uuid;
};

/**
 * @description  Fetches a user in the database using email, and sends otp to the email.
 * @param (email) : string
 * @returns   User Id(uuid)
 */
const forgotPasswordService = async (email) => {
  const user = await User.findOne({
    email: { $regex: new RegExp(email, "i") },
  });
  if (!user) throw ErrUserNotFound;

  const otp = generateOTP();

  await OTP.create({
    user_uuid: user.uuid,
    otpCode: otp,
  });
  await generateAndSendOTP({ email, otp, flag: "reset" });
  return user.uuid;
};

/**
 * @description  Fetches a user in the database using email, and sends otp to the email.
 * @param (email) : string
 * @returns   User Id(uuid)
 */
const changePasswordService = async (userId, password, otp) => {
  const user = await User.findOne({ uuid: userId });
  if (!user) throw ErrUserNotFound;

  const isOtp = await OTP.findOneAndDelete({
    otpCode: otp,
  });

  if (!isOtp) throw ErrInvalidOTP;

  const hp = await hashPassword(password);
  await user.updateOne({ password: hp });
  return;
};

const socialAuthLoginService = async (userObj) => {
  let findUser;
  console.log("==========", userObj);
  if (!userObj) throw ErrUnauthorized;
  findUser = await User.findOne({ email: userObj.email });

  if (!findUser) {
    findUser = await User.create({
      email: userObj.email,
      fullName: `${userObj.firstName} ${userObj.lastName}`,
      social_id: userObj.id,
    });
  }
  const payload = {
    uuid: findUser.uuid,
  };

  const token = await generateToken(payload);

  return { token, user: findUser.email };
};

export const AuthService = {
  createUserAccountService,
  loginUserAccountService,
  verifyUserOtpService,
  forgotPasswordService,
  changePasswordService,
  socialAuthLoginService,
};
