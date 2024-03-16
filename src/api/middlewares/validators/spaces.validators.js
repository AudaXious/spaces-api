import Joi from "joi";

export const createSpaceValidator = Joi.object({
    title: Joi.string().required(),
    description : Joi.string(),
    tags : Joi.array(),
    links : Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        url: Joi.string().uri().required()
      })
    ),
  });