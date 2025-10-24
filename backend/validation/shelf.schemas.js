import Joi from "joi";

export const createShelfSchema = Joi.object({
    label: Joi.string().required(),
})