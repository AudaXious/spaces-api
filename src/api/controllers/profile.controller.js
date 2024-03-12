
import { ProfileService } from "../services/app/profile.service.js";
import { getErrorMessage } from "../../errors/index.js";


export const createUsername = async (req, res) => {
    try {
      const userId = req.user._id;
      const {username} = req.body;
      const user = await ProfileService.createUsernameService(username, userId);
      res.status(200).json({
        success: true,
        message: "Username updated successfully",
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
  
export const getUser = async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await ProfileService.getUserService(userId);
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
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
  