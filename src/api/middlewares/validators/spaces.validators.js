import Joi from "joi";

export const createSpaceValidator = Joi.object({
    title: Joi.string().trim().pattern(/^\S+$/, 'no spaces allowed').required(),
    description : Joi.string(),
    tags : Joi.array(),
    links : Joi.array(),
    inviteCode : Joi.string().required(),
});