import { Router } from "express";
import {
    createSpace
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

export default routes;
