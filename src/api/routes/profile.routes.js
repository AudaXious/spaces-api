import { Router } from "express";
import { createUsername, getUser } from "../controllers/profile.controller.js";
import { validateRequest } from "../utils/api-utils.js";
import { createUsernameValidator } from "../middlewares/validators/profile.validators.js";

const routes = Router();

routes.post(
  "/update-username",
  validateRequest(createUsernameValidator),
  createUsername
);

routes.get(
  "/user", getUser
)

export default routes;