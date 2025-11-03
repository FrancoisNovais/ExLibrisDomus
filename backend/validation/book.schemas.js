import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(0),
  pages: Joi.number().integer().min(1),
  language: Joi.string(),
  rating: Joi.number().integer().min(1).max(5),
  cover: Joi.string().uri(),
  favorite: Joi.boolean(),
  synopsis: Joi.string(),
  analysis: Joi.string(),
  read: Joi.boolean(),
  id_author: Joi.number().integer(),
  id_shelf: Joi.number().integer(),
  id_genre: Joi.number().integer(),
});

export const updateBookSchema = Joi.object({
  title: Joi.string(),
  year: Joi.number().integer().min(0),
  pages: Joi.number().integer().min(1),
  language: Joi.string(),
  rating: Joi.number().integer().min(1).max(5),
  cover: Joi.string().uri(),
  favorite: Joi.boolean(),
  synopsis: Joi.string(),
  analysis: Joi.string(),
  read: Joi.boolean(),
  id_author: Joi.number().integer(),
  id_shelf: Joi.number().integer(),
  id_genre: Joi.number().integer(),
}).min(1);
