import joi from "joi";

export const createCampaignAndTasksValidator = joi.object({
    title : joi.string().required(),
    description : joi.string(),
    points : joi.number().required(),
    startDate : joi.date().iso().required(),
    endDate : joi.date().iso().required(),
    tasks : joi.array().items(
        joi.object({
         action: joi.string().lowercase().required().valid("share", "post", "like", "repost", "follow", "join"),
         media : joi.string().valid("audaxious", "twitter").required(),
         url : joi.string().required()
        })
     ).required(),
})