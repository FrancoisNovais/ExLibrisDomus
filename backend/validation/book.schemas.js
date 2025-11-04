import Joi from "joi";

// Schéma STANDARD (inchangé - pour créations simples)
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

// Schéma pour un nouvel auteur (inline)
const newAuthorSchema = Joi.object({
  last_name: Joi.string().required(),
  first_name: Joi.string().allow('', null),
  birth_date: Joi.date().allow(null),
});

// NOUVEAU SCHÉMA AVANCÉ (pour le front avec création d'auteur/genre)
export const createBookAdvancedSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(0),
  pages: Joi.number().integer().min(1),
  language: Joi.string(),
  rating: Joi.number().integer().min(1).max(5).allow(null),
  cover: Joi.string().uri().allow('', null),
  favorite: Joi.boolean().default(false),
  synopsis: Joi.string().allow('', null),
  analysis: Joi.string().allow('', null),
  read: Joi.boolean().default(false),
  
  // AUTEUR : soit ID existant, soit nouvel auteur
  id_author: Joi.number().integer(),
  author: newAuthorSchema,
  
  // GENRE : soit ID existant, soit nouveau genre (string)
  id_genre: Joi.number().integer(),
  genre: Joi.string(),
  
  // ÉTAGÈRE : optionnelle
  id_shelf: Joi.number().integer().allow(null),
})
  .xor('id_author', 'author')
  .xor('id_genre', 'genre');

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