import Joi from "joi";

export const createUsernameValidator = Joi.object({
    username: Joi.string().required(),
  });