import joi from "joi";

export const createCampaignAndTasksValidator = joi.object({
    title : joi.string().required(),
    description : joi.string(),
    startDate : joi.date().iso().required(),
    endDate : joi.date().iso().required(),
})