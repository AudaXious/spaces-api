import { Router } from "express";
import { validateRequest } from "../utils/api-utils.js";
import { createTask, participateInTasks, getUserCompletedTasksForCampaign } from "../controllers/task.controller.js";
import { createTaskValidator } from "../middlewares/validators/task.validators.js";

const routes = Router();
//
routes.post("/:campaignId/create", validateRequest(createTaskValidator), createTask);
//
routes.post("/participate/:taskId", participateInTasks);
//
routes.get("/completed/:campaignId", getUserCompletedTasksForCampaign);
export default routes;
