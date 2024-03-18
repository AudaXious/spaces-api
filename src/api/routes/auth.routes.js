import { Router } from "express";
import {
  createUserOrLoginAccount,
  verifyUserOtp,
  walletLogIn,
} from "../controllers/auth.controller.js";
import { validateRequest } from "../utils/api-utils.js";
import {
  createUserOrLoginAccountValidator,
  OTPVerificationValidator,
  walletLogInValidator,
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
routes.post("/wallet/login",validateRequest(walletLogInValidator), walletLogIn);

export default routes;
