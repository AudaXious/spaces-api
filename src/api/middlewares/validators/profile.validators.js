import Joi from "joi";

export const createUsernameValidator = Joi.object({
  username: Joi.string()
    .min(4)
    .pattern(/^[a-zA-Z0-9_.]{4,}$/, 'username must include alphanumeric, underscore, and full stop characters only, no spaces allowed')
    .required(),
});


  export const changeUsernameValidator = Joi.object({
    newUsername: Joi.string()
        .min(4)
        .pattern(/^[a-zA-Z0-9_.]{4,}$/, 'username must include alphanumeric, underscore, and full stop characters only, no spaces allowed')
        .required(),
    prevUsername: Joi.string().required(),
  });