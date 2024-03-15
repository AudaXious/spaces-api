import joi from "joi";

export const createCampaignValidator = joi.object({
    title : joi.string().required().min(1),
    description : joi.string(),
})