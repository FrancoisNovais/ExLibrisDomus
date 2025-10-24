import { Router } from "express";
import genreController from "../controllers/genre.controller.js";
import { paramsSchema } from "../validation/global.schemas.js";
import validateSchema from "../middlewares/validate.js";
import { createGenreSchema, updateGenreSchema } from "../validation/genre.schemas.js";

const router = Router();

/**
 * GET /api/genres
 * @summary Récupérer tous les genres
 * @tags Genre
 * @return {array<Genre>} 200 - Liste de tout les genres
 */
router.get(
    "/",
    genreController.getAll.bind(genreController)
);

/**
 * GET /api/genres/{itemId}
 * @summary Récupérer un genre par son ID
 * @tags Genre
 * @param {string} itemId.path.required - ID du genre
 * @return {Genre} 200 - Genre trouvé
 * @return {object} 404 - Genre non trouvé
 */
router.get(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  genreController.getById.bind(genreController)
);

/** * POST /api/genres
 * @summary Créer un nouveau genre
 * @tags Genre
 * @param {Genre} request.body.required - Données du genre
 * @return {Genre} 201 - Genre créé
 * @return {object} 400 - Erreur de validation
 */
router.post(
    "/",
    validateSchema(createGenreSchema, "body"),
    genreController.create.bind(genreController)
)

/**
 * PATCH /api/genres/{itemId}
  * @summary Mettre à jour un genre
  * @tags Genre
  * @param {string} itemId.path.required - ID du genre
  * @param {Genre} request.body.required - Champs à mettre à jour
  * @return {Genre} 200 - Genre mis à jour
  * @return {object} 400 - Erreur de validation
  * @return {object} 404 - Genre non trouvé
 */
router.patch(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  validateSchema(updateGenreSchema , "body"),
  genreController.updateById.bind(genreController)
);

/** DELETE /api/genres/{itemId}
 * @summary Supprimer un genre par son ID
 * @tags Genre
 * @param {string} itemId.path.required - ID du genre
 * @return {object} 204 - Genre supprimé
 * @return {object} 404 - Genre non trouvé
 */
router.delete(
    "/:itemId",
    validateSchema(paramsSchema, "params"),
    genreController.deleteById.bind(genreController)
);

export default router;