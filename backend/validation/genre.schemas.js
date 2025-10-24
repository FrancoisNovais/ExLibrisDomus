import Joi from "joi";

export const createGenreSchema = Joi.object({
    category: Joi.string().required(),
})

export const updateGenreSchema = createGenreSchema