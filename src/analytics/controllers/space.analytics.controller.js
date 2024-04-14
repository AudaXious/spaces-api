import { getErrorMessage } from "../../errors/index.js";
import { SpaceAnalyticsService } from "../services/app/space.analytics.service.js";


/**
 * @description Get Leadership board data for spaces points
 */
export const getSpaceLeaderShipBoardData = async (req, res) => {
  try {
    const {spaceId} = req.params;
    const spaceLeaderShipBoard = await SpaceAnalyticsService.getSpaceLeaderShipBoardDataService(spaceId);
    res.status(200).json({
      success: true,
      data: spaceLeaderShipBoard
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