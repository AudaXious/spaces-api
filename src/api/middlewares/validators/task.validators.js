import joi from "joi";

export const createTaskValidator = joi.object({
    tasks : joi.array().items(
       joi.object({
        action: joi.string().lowercase().required().valid("share", "post", "like", "repost", "follow", "join"),
        url : joi.string().required()
       })
    )
});



