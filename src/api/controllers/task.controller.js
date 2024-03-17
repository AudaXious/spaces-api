import { getErrorMessage } from "../../errors/index.js";
import { TaskService } from "../services/app/task.service.js";


export const createTask = async (req, res) => {
    try {
      const userId = req.user._id;
      const userReq = req.body;
      const {campaignId} = req.params;
      const task = await TaskService.createTaskService(userId, userReq, campaignId);
      res.status(200).json({
        success: true,
        message: "Task Created",
        data: task
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