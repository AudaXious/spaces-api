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


export const getAllSpacesCampaign = async (req, res) => {
    try {
      const {spaceId} = req.params;
      const campaigns = await CampaignService.getAllSpacesCampaignService(spaceId)
      res.status(200).json({
        success: true,
        message: "Campaigns Fetched",
        data: campaigns
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


export const getACampaign = async (req, res) => {
    try {
      const {campaignId} = req.params;
      const campaigns = await CampaignService.getACampaignService(campaignId)
      res.status(200).json({
        success: true,
        message: "Campaign Fetched",
        data: campaigns
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

export const getCampaigns = async (req, res) => {
    try {
      const campaigns = await CampaignService.getCampaignsService()
      res.status(200).json({
        success: true,
        message: "Campaign Fetched",
        data: campaigns
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