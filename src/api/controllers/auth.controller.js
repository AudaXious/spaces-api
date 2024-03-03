import { AuthService } from "../services/app/auth.service.js";
import { getErrorMessage } from "../../errors/index.js";


/**
 * @description User account creation controller
 */
export const createUserOrLoginAccount = async (req, res) => {
  try {
    const userReq = req.body;
    const user = await AuthService.createUserOrLoginAccountService(userReq);
    res.status(201).json({
      success: true,
      message: "Account log in success",
      ...user
    });
    return;
  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({
      success: false,
      error: result.message,
    });
  }
};


/**
 * @description Otp verification controller.
 */
export const verifyUserOtp = async (req, res) => {
  try {
    const {email, otp} = req.body;
    const {type} = req.query;
    const userId = await AuthService.verifyUserOtpService(otp, email, type)
    res.status(200).json({
      success: true,
      message: `Otp verified`,
      userId,
    });
    return;
  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({
      success: false,
      error: result.message,
    });
  }
};


/**
 * @description forgot password controller.
 */
export const forgotPassword = async (req, res) =>{
  try {
    const {email} = req.body;
    const userId = await AuthService.forgotPasswordService(email)
    res.status(200).json({
      success: true,
      message: `Recovery Otp sent to ${email}`,
      userId
    });
    return;
  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({
      success: false,
      error: result.message,
    });
  }
}

export const changePassword = async(req, res) =>{
  try {
    const {password, otp, userId} = req.body;

    await AuthService.changePasswordService(userId, password, otp)
    res.status(200).json({
      success: true,
      message: 'Password change successful',
    });
    return;
  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({
      success: false,
      error: result.message,
    });
  }
}