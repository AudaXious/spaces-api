import Joi from "joi";

export const createUsernameValidator = Joi.object({
    username: Joi.string().required(),
  });


  export const changeUsernameValidator = Joi.object({
    newUsername: Joi.string().required(),
    prevUsername: Joi.string().required(),
  });