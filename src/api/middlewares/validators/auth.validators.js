import joi from "joi";

const passwordValidationRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

export const createUserAccountValidator = joi
  .object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .min(8)
      .max(32)
      .required()
      .regex(passwordValidationRegex),
  })
  .messages({
    "string.pattern.base":
      "Password must be of 8 characters, must have an upper case letter, and must include at least one special character (!@#$%^&*)",
  });

export const loginUserAccountValidator = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(32).required(),
});
export const OTPVerificationValidator = joi.object({
  email: joi.string().email().required(),
  otp: joi.string().min(6).required(),
});

export const forgotPasswordValidator = joi.object({
  email: joi.string().email().required(),
});

export const changePasswordValidator = joi
  .object({
    userId : joi.string().required(),
    otp :joi.string().required(),
    password: joi
      .string()
      .min(8)
      .max(32)
      .required()
      .regex(passwordValidationRegex),
  })
  .messages({
    "string.pattern.base":
      "Password must be of 8 characters, must have an upper case letter, and must include at least one special character (!@#$%^&*)",
  });
