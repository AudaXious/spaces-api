import { PointsService } from "../services/app/point.service.js";
import { getErrorMessage } from "../../errors/index.js";

//
export const claimTasksPoints = async (req, res) => {
    try {
      const userId = req.user._id;
      const {campaignId} = req.params;
      await PointsService.claimTasksPointsService(userId, campaignId);
      res.status(200).json({
        success: true,
        message: "Points claimed",
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
