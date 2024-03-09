import { Router } from "express";
import {
  createUserOrLoginAccount,
  verifyUserOtp,
} from "../controllers/auth.controller.js";
import { validateRequest } from "../utils/api-utils.js";
import {
  createUserOrLoginAccountValidator,
  OTPVerificationValidator,
} from "../middlewares/validators/auth.validators.js";

const routes = Router();

routes.post(
  "/onboard",
  validateRequest(createUserOrLoginAccountValidator),
  createUserOrLoginAccount
);
//
routes.post("/verify",validateRequest(OTPVerificationValidator), verifyUserOtp);

export default routes;
