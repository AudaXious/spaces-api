import { Router } from "express";
import {
    createSpace, joinSpace
} from "../controllers/spaces.controller.js";
import { validateRequest } from "../utils/api-utils.js";
import {
    createSpaceValidator
} from "../middlewares/validators/spaces.validators.js";

const routes = Router();

routes.post(
  "/create",
  validateRequest(createSpaceValidator),
  createSpace
);

routes.post("/join/:spaceId", joinSpace)
export default routes;
