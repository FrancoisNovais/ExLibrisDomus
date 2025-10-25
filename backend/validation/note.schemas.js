import Joi from "joi";

export const createNoteSchema = Joi.object({
    page: Joi.number().integer().required(),
    content: Joi.string(),
    id_book: Joi.number().integer().required(),
});
