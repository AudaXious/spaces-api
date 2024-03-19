import joi from "joi";

export const createTaskValidator = joi.object({
    action: joi.string().lowercase().required().valid("share", "post", "like", "repost", "follow"),
    url : joi.string().required()
});



