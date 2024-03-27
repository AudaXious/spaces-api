import joi from "joi";

export const createTaskValidator = joi.object({
    points : joi.number().required(),
    tasks : joi.array().items(
        joi.object({
         action: joi.string().lowercase().required().valid("share", "post", "like", "repost", "follow", "join"),
         media : joi.string().valid("audaxious", "twitter").required(),
         url : joi.string().required()
        })
     ).required(),
});

//
export const participateInTaskValidator = joi.object({
    tasks : joi.array().items(
        joi.object({
         uuid: joi.string().required(),
        })
     ).required(),
});



