import joi from "joi";

export const createCampaignValidator = joi.object({
    title : joi.string().required(),
    description : joi.string(),
    points : joi.number().required(),
    endDate : joi.date().iso().required()
})