import { Router } from "express";
import {
  changePassword,
  createUserOrLoginAccount,
  forgotPassword,
  // loginUserAccount,
  verifyUserOtp,
} from "../controllers/auth.controller.js";
import { validateRequest } from "../utils/api-utils.js";
import {
  changePasswordValidator,
  createUserOrLoginAccountValidator,
  forgotPasswordValidator,
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

//
routes.post("/forgot-password", validateRequest(forgotPasswordValidator),forgotPassword);

//
routes.patch("/change-password",validateRequest(changePasswordValidator), changePassword);
export default routes;
