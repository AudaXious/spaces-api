import joi from "joi";

export const verifySocialLinkValidator = joi.object({
    url : joi.string().required(),
})