import { Router } from "express";
import { validateRequest } from "../utils/api-utils.js";
import { createTask } from "../controllers/task.controller.js";

const routes = Router();
//
routes.post("/:campaignId/create", createTask);

export default routes;
