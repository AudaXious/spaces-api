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

  export const participateInTasks = async (req, res) => {
    try {
      const userId = req.user._id;
      const {campaignId, spaceId} = req.query;
      const {taskId} = req.params;
      const task = await TaskService.participateInTasksService(taskId, campaignId, userId, spaceId);
      res.status(200).json({
        success: true,
        message: "Task completed",
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

  export const getUserCompletedTasksForCampaign = async (req, res) => {
    try {
      const userId = req.user._id;
      const {campaignId} = req.params;
      const tasks = await TaskService.getUserCompletedTasksForCampaignService(userId, campaignId);
      res.status(200).json({
        success: true,
        message: "Tasks fetched",
        data: tasks
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


  export const participateInAllTasks  = async (req, res) => {
    try {
      const userId = req.user._id;
      const {campaignId} = req.params;
      const {tasks} = req.body
      const task = await TaskService.participateInAllTasksService(userId, campaignId, tasks);
      res.status(200).json({
        success: true,
        message: "Tasks completed",
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
