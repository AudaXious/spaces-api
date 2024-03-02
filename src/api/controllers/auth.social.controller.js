import { AuthService } from "../services/app/auth.service.js";
import { getErrorMessage } from "../../errors/index.js";

//
export const socialAuthController = async (req, res) => {
  try {
    const data = req.user;
    const userCred = await AuthService.socialAuthLoginService(data);
    return res.status(200).json({
      success: true,
      message: "Sign in successful",
      token: userCred.token,
      user: userCred.user,
    });
  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({ error: result.message });
  }
};
