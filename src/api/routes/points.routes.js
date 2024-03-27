import { Router } from "express";
import { claimTasksPoints } from "../controllers/point.controller.js";

const routes = Router();

routes.post("/claim/:campaignId", claimTasksPoints);

export default routes;
