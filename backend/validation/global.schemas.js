import Joi from "joi";

export const paramsSchema = Joi.object({
  itemId: Joi.number().integer().required(),
});