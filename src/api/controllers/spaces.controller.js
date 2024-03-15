import { SpaceService } from "../services/app/spaces.service.js";
import { getErrorMessage } from "../../errors/index.js";

export const createSpace = async (req, res) => {
    try {
      const userReq = req.body;
      const userId = req.user._id;
      const space = await SpaceService.createSpaceService(userReq, userId);
      res.status(200).json({
        success: true,
        message: "Space created",
        data: space
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


  export const joinSpace = async (req, res) => {
    try {
      const {spaceId} = req.params;
      const userId = req.user._id;
      const space = await SpaceService.joinSpaceService(spaceId, userId);
      res.status(200).json({
        success: true,
        message: "Space Joined",
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

  export const getAllSpaces = async (req, res) => {
    try {
      const space = await SpaceService.getAllSpacesService();
      res.status(200).json({
        success: true,
        message: "Spaces fetched Succesfully",
        data : space,
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

  export const getASpace = async (req, res) => {
    try {
      const {spaceId} = req.params;
      const space = await SpaceService.getASpaceService(spaceId);
      res.status(200).json({
        success: true,
        message: "Space fetched Succesfully",
        data : space,
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