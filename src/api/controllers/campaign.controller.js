import { CampaignService } from "../services/app/campaign.service.js";
import { getErrorMessage } from "../../errors/index.js";


export const createCampaign = async (req, res) => {
    try {
      const userId = req.user._id;
      const userReq = req.body;
      const {spaceId} = req.params;
      const campaign = await CampaignService.createCampaignService(userReq, userId, spaceId)
      res.status(200).json({
        success: true,
        message: "Campaign Created",
        data: campaign
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