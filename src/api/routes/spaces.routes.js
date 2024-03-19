import { Router } from "express";
import {
    createSpace, 
    joinSpace,
    getAllSpaces,
    getASpace,
    getUserSpace,
    getUserJoinedSpace
} from "../controllers/spaces.controller.js";
import { validateRequest } from "../utils/api-utils.js";
import {
    createSpaceValidator
} from "../middlewares/validators/spaces.validators.js";
import { authorizeUser } from "../middlewares/auth.middleware.js";

const routes = Router();

routes.post(
  "/create",
  validateRequest(createSpaceValidator),
  authorizeUser,
  createSpace
);

routes.post("/join/:spaceId", authorizeUser, joinSpace)

routes.get("/all", getAllSpaces)
//
routes.get("/s/:spaceId", getASpace);
//
routes.get("/user/all", authorizeUser, getUserSpace);
//
routes.get("/user/joined/all", authorizeUser, getUserJoinedSpace);
export default routes;
