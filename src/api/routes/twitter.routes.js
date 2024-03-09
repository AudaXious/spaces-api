import { Router } from "express";
import { validateRequest } from "../utils/api-utils.js";
import { linkAccount, verifySocialLink } from "../controllers/twitter.controller.js";
import { verifySocialLinkValidator } from "../middlewares/validators/twitter.validators.js";

const routes = Router();

routes.get("/link-account", linkAccount)
//
routes.post("/verify",validateRequest(verifySocialLinkValidator) , verifySocialLink)
//
export default routes;