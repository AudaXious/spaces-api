import { Router } from "express";
import { validateRequest } from "../utils/api-utils.js";
import { createTask } from "../controllers/task.controller.js";
import { createTaskValidator } from "../middlewares/validators/task.validators.js";

const routes = Router();
//
routes.post("/:campaignId/create", validateRequest(createTaskValidator), createTask);

export default routes;
