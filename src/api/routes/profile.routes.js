import { Router } from "express";
import { changeUsername, createUsername, getUser } from "../controllers/profile.controller.js";
import { validateRequest } from "../utils/api-utils.js";
import { changeUsernameValidator, createUsernameValidator } from "../middlewares/validators/profile.validators.js";

const routes = Router();

routes.post(
  "/update-username",
  validateRequest(createUsernameValidator),
  createUsername
);

routes.get(
  "/user", getUser
)

routes.patch("/edit/username", validateRequest(changeUsernameValidator), changeUsername)

export default routes;