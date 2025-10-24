import Joi from "joi";

export const createAuthorSchema = Joi.object({
  last_name: Joi.string().required(),
  first_name: Joi.string(),
  birth_date: Joi.date(),
});

export const updateAuthorSchema = Joi.object({
  last_name: Joi.string(),
  first_name: Joi.string(),
  birth_date: Joi.date(),
}).min(1);