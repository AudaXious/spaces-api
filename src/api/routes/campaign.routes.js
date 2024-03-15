import { Router } from "express";
import {validateRequest} from "../utils/api-utils.js"
import { createCampaignValidator } from "../middlewares/validators/campaign.validator.js";
import { createCampaign } from "../controllers/campaign.controller.js";

const routes = Router();

routes.post("/create/:spaceId", validateRequest(createCampaignValidator), createCampaign)

export default routes;