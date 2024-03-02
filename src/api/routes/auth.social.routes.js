import { Router } from "express";
import passport from "passport";
import { socialAuthController } from "../controllers/auth.social.controller.js";
import CONFIG from "../../config/default.js"

const routes = Router();
const CLIENT_ROUTE = CONFIG.CLIENT_ROUTE || "http://localhost:8080/dashboard"

routes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

routes.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_ROUTE,
  })
);

//
routes.get("/login/success", socialAuthController);

export default routes;
