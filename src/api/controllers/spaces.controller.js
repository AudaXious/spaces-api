import { SpaceService } from "../services/app/spaces.service.js";
import { getErrorMessage } from "../../errors/index.js";

export const createSpace = async (req, res) => {
    try {
      const userReq = req.body;
      const {_id} = req.user;
      const space = await SpaceService.createSpaceService(userReq, _id, req);
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
      const {spaceNameOrId} = req.params;
      const space = await SpaceService.getASpaceService(spaceNameOrId);
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


export const getUserSpace = async (req, res) => {
    try {
      const {uuid} = req.user;
      const spaces = await SpaceService.getUserSpaceService(uuid);
      res.status(200).json({
        success: true,
        message: "User's Space fetched Succesfully",
        data : spaces,
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
export const getUserJoinedSpace = async (req, res) => {
    try {
      const {_id} = req.user;
      const spaces = await SpaceService.getUserJoinedSpaceService(_id);
      res.status(200).json({
        success: true,
        message: "User's Space fetched Succesfully",
        data : spaces,
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