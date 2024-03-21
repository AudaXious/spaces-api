import joi from "joi";

export const createCampaignValidator = joi.object({
    title : joi.string().trim().pattern(/^\S+$/, 'no spaces allowed').required(),
    description : joi.string(),
    points : joi.number().required(),
    endDate : joi.date().iso().required()
})