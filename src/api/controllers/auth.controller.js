import { AuthService } from "../services/app/auth.service.js";
import { getErrorMessage } from "../../errors/index.js";


/**
 * @description User account & login creation controller
 */
export const createUserOrLoginAccount = async (req, res) => {
  try {
    const userReq = req.body;
    const user = await AuthService.createUserOrLoginAccountService(userReq);
    res.status(200).json({
      success: true,
      message: "Account log in success",
      data: user
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
    const user = await AuthService.verifyUserOtpService(otp, email, type)
    res.status(200).json({
      success: true,
      message: `Otp verified`,
      data: user,
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
 * @description Wallet  account & login creation controller
 */
export const walletLogIn = async (req, res) => {
  try {
    const {walletId} = req.body;
    const user = await AuthService.walletLogInService(walletId);
    res.status(200).json({
      success: true,
      message: "Account log in success",
      data: user
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
