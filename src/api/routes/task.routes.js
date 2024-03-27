import { Router } from "express";
import { validateRequest } from "../utils/api-utils.js";
import { createTask, participateInTasks, getUserCompletedTasksForCampaign, participateInAllTasks } from "../controllers/task.controller.js";
import { createTaskValidator, participateInTaskValidator } from "../middlewares/validators/task.validators.js";

const routes = Router();
//
routes.post("/:campaignId/create", validateRequest(createTaskValidator), createTask);
//
// routes.post("/participate/:taskId", participateInTasks);
//
routes.post("/participate/all/:campaignId", validateRequest(participateInTaskValidator), participateInAllTasks);
//
routes.get("/completed/:campaignId", getUserCompletedTasksForCampaign);
export default routes;
