import Joi from "joi";

export const createBorrowerSchema = Joi.object({
    email: Joi.string().required(),
    last_name: Joi.string().required(),
    first_name: Joi.string(),
    phone: Joi.string(),
});

export const updateBorrowerSchema = Joi.object({
    email: Joi.string(),
    last_name: Joi.string(),
    first_name: Joi.string(),
    phone: Joi.string(),
}).min(1);
