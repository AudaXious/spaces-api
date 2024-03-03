import Joi from "joi";

export const createSpaceValidator = Joi.object({
    title: Joi.string().required(),
    description : Joi.string(),
  });