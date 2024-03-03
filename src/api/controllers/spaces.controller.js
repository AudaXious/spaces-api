import { SpaceService } from "../services/app/spaces.service.js";

export const createSpace = async (req, res) => {
    try {
      const userReq = req.body;
      const space = await SpaceService.createSpaceService(userReq);
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