import { Router } from "express";
import {
  changePassword,
  createUserAccount,
  forgotPassword,
  loginUserAccount,
  verifyUserOtp,
} from "../controllers/auth.controller.js";
import { validateRequest } from "../utils/api-utils.js";
import {
  changePasswordValidator,
  createUserAccountValidator,
  forgotPasswordValidator,
  loginUserAccountValidator,
  OTPVerificationValidator,
} from "../middlewares/validators/auth.validators.js";

const routes = Router();

routes.post(
  "/create",
  validateRequest(createUserAccountValidator),
  createUserAccount
);
//
routes.post(
  "/login",
  validateRequest(loginUserAccountValidator),
  loginUserAccount
);

//
routes.post("/verify",validateRequest(OTPVerificationValidator), verifyUserOtp);

//
routes.post("/forgot-password", validateRequest(forgotPasswordValidator),forgotPassword);

//
routes.patch("/change-password",validateRequest(changePasswordValidator), changePassword);
export default routes;
