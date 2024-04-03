import Joi from "joi";
import { tag } from "../../../database/models/spaces/spaces.js";

export const createSpaceValidator = Joi.object({
    title: Joi.string().trim().pattern(/^\S+$/, 'no spaces allowed').required(),
    description : Joi.string(),
    tags : Joi.array().items(Joi.string().valid(...tag)),
    links : Joi.array().items(
        Joi.object({
            type : Joi.string().required(),
            url : Joi.string().uri().required(),
        })
    ),
    inviteCode : Joi.string().required(),
});