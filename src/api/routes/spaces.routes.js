import { Router } from "express";
import {
    createSpace, 
    joinSpace,
    getAllSpaces
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

routes.get("/all", getAllSpaces)
export default routes;
