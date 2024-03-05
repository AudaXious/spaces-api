import { Router } from "express";
import { createUsername } from "../controllers/profile.controller.js";
import { validateRequest } from "../utils/api-utils.js";
import { createUsernameValidator } from "../middlewares/validators/profile.validators.js";

const routes = Router();

routes.post(
  "/update-username",
  validateRequest(createUsernameValidator),
  createUsername
);

export default routes;