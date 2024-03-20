import { Router } from "express";
import {validateRequest} from "../utils/api-utils.js"
import { createCampaignValidator } from "../middlewares/validators/campaign.validator.js";
import { createCampaign, getACampaign, getAllSpacesCampaign, getCampaigns } from "../controllers/campaign.controller.js";

const routes = Router();

routes.post("/create/:spaceId", validateRequest(createCampaignValidator), createCampaign)
//
routes.get("/:spaceId/all", getAllSpacesCampaign)
//
routes.get("/all-campaigns", getCampaigns)
//
routes.get("/:campaignId", getACampaign)

export default routes;