import { Router } from "express";
import {validateRequest} from "../utils/api-utils.js"
import { createCampaignAndTasksValidator } from "../middlewares/validators/campaign.validator.js";
import { createCampaignAndTasks, getACampaign, getAllSpacesCampaign, getCampaigns } from "../controllers/campaign.controller.js";
import { authorizeUser } from "../middlewares/auth.middleware.js";

const routes = Router();

routes.post("/create/:spaceId", authorizeUser, validateRequest(createCampaignAndTasksValidator), createCampaignAndTasks)
//
routes.get("/:spaceId/all", getAllSpacesCampaign)
//
routes.get("/all-campaigns", getCampaigns)
//
routes.get("/:campaignId", getACampaign)

export default routes;