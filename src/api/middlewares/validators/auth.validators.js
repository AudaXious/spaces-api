import joi from "joi";

export const createUserOrLoginAccountValidator = joi
  .object({
    email: joi.string().email().required(),
  });

export const OTPVerificationValidator = joi.object({
  email: joi.string().email().required(),
  otp: joi.string().min(6).required(),
});
