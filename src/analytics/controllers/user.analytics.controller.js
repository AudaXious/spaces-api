import { getErrorMessage } from "../../errors/index.js";
import { UserAnalyticsService } from "../services/app/user.analytics.service.js";


/**
 * @description Get Leadership board data for global points
 */
export const getGlobalLeaderShipBoardData = async (req, res) => {
  try {
    const {page} = req.query;
    const LeaderShipBoard = await UserAnalyticsService.getGlobalLeaderShipBoardDataService(page);
    res.status(200).json({
      success: true,
      data: LeaderShipBoard
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
 * @description Get total number of users
 */
export const getTotalNumberOfUser = async (req, res) => {
  try {
    const allUsers = await UserAnalyticsService.getTotalNumberOfUserService();
    res.status(200).json({
      success: true,
      data: allUsers
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