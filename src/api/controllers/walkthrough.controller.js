import { getErrorMessage } from "../../errors/index.js";
import { WalkthroughService } from "../services/app/walkthrough.service.js";

export const updateUserInformation = async (req, res) => {
  try {
    const userReq = req.body;
    const {userId} = req.params
    await WalkthroughService.updateUserInformationService(userReq, userId);
    res.status(200).json({
      success: true,
      message: "User Information updated",
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
