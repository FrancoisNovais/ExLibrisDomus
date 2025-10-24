import { Router } from "express";
import authorController from "../controllers/author.controller.js";
import validateSchema from "../middlewares/validate.js";
import { paramsSchema } from "../validation/global.schemas.js";
import { createAuthorSchema, updateAuthorSchema } from "../validation/author.schemas.js";

const router = Router();

/**
 * GET /api/authors
 * @summary Récupérer tous les auteurs
 * @tags Author
 * @return {array<Author>} 200 - Liste de tous les auteurs
 */
router.get(
    "/",
    authorController.getAll.bind(authorController)
);

/**
 * GET /api/authors/{itemId}
 * @summary Récupérer un auteur par son ID
 * @tags Author
 * @param {string} itemId.path.required - ID de l'auteur
 * @return {Author} 200 - Auteur trouvé
 * @return {object} 404 - Auteur non trouvé
 */
router.get(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  authorController.getById.bind(authorController)
);

/** * POST /api/authors
 * @summary Créer un nouvel auteur
 * @tags Author
 * @param {Author} request.body.required - Données de l'auteur
 * @return {Author} 201 - Auteur créé
 * @return {object} 400 - Erreur de validation
 */
router.post(
    "/",
    validateSchema(createAuthorSchema, "body"),
    authorController.create.bind(authorController)
)

/**
 * PATCH /api/authors/{itemId}
  * @summary Mettre à jour un auteur existant
  * @tags Author
  * @param {string} itemId.path.required - ID de l'auteur
  * @param {Author} request.body.required - Champs à mettre à jour
  * @return {Author} 200 - Auteur mis à jour
  * @return {object} 400 - Erreur de validation
  * @return {object} 404 - Auteur non trouvé
 */
router.patch(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  validateSchema(updateAuthorSchema, "body"),
  authorController.updateById.bind(authorController)
);

export default router;