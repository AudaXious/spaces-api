import User from "../../../database/models/user/user.js";
import OTP from "../../../database/models/otp/otp.js";
import {
  generateOTP,
  generateAndSendOTP,
} from "../../utils/auth.util.js";
import {
  ErrUserNotFound,
  ErrInvalidOTP,
  ErrAccountNotVerified,
  ErrUnauthorized,
  ErrResourceAlreadyExists,
} from "../../../errors/index.js";

import { generateToken } from "../security/token.service.js";
import Username from "../../../database/models/user/username.js";
import Points from "../../../database/models/points/points.js";

/**
 * @description  This method creates or login a User Account
 * @param (userReq) i.e user attributes object
 * @returns user object
 */
const createUserOrLoginAccountService = async (userReq) => {
  const { email, } = userReq;

  let user = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  });

  if (!user){
    user = await User.create({
      email,
    })

    await Points.create({
      user_id : user._id
    })
  }

   
  const otp = generateOTP();

  // const payload = {
  //   _id: user._id,
  //   uuid: user.uuid,
  //   isVerified: user.isVerified,
  // };

  await OTP.findOneAndReplace(
    { user_uuid : user.uuid },
    { user_uuid :user.uuid, otpCode : otp },
    { upsert: true, new: true }
  );

  await generateAndSendOTP({ email, otp, flag: "verify" });
  
  const username = await Username.findOne({
    user_id : user._id
  });

  return {
    ...user.toJSON(), 
    username : username !== null ? username.username : null,
    twitterUsername : username !== null ? username.twitterUsername : null,
  };
};

/**
 * @description  Verifies a received user otp with the otpCode stored in the database
 * @param (otp) : string
 * @returns   true
 */
const verifyUserOtpService = async (otp, email, type) => {
  if(type !== 'reset' && type !== 'verify') throw ErrMissingKeyFields;

  const user = await User.findOne({ email: { $regex: new RegExp(email, "i") } });
  
  if (!user) throw ErrInvalidOTP;
  
  const username = await Username.findOne({
    user_id : user._id
  });
  let isOtp;

  // to handle forgot password otp verification...
  if (type === "reset") {
    isOtp = await OTP.findOne({
      user_uuid: user.uuid,
      otpCode: otp,
    });
    if (!isOtp) throw ErrInvalidOTP;
  }
  //handle account verification only
  else {
    isOtp = await OTP.findOneAndDelete({
      otpCode: otp,
      user_uuid : user.uuid,
    });
    if (!isOtp) throw ErrInvalidOTP;
    await user.updateOne({ isVerified: true });
  }

  const payload = {
    _id: user._id,
    uuid: user.uuid,
    isVerified: user.isVerified,
  };

  const token = await generateToken(payload);

  return {...user.toJSON(), username : username !== null ? username.username : null, token};
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

const walletLogInService = async(walletId)=>{
  let wallet;

  wallet = await User.findOne({
    walletId : { $regex: new RegExp(`^${walletId}$`, "i") }, //
  });

  if(!wallet){
    wallet = await User.create({
      walletId : walletId,
      isVerified : true,
    });

    await Points.create({
      user_id : wallet._id
    })
  };

  const payload = {
    _id: wallet._id,
    uuid: wallet.uuid,
    isVerified: wallet.isVerified,
  };

  const token = await generateToken(payload);

  const username = await Username.findOne({
    user_id : wallet._id
  });

  return {
    ...wallet.toJSON(), 
    username : username ? username.username : null,
    token,
    twitterUsername : username !== null ? username.twitterUsername : null,

  }
}


export const AuthService = {
  createUserOrLoginAccountService,
  verifyUserOtpService,
  socialAuthLoginService,
  walletLogInService
};
