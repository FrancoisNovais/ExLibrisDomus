import { Router } from "express";
import genreController from "../controllers/genre.controller.js";
import { paramsSchema } from "../validation/global.schemas.js";
import validateSchema from "../middlewares/validate.js";

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

export default router;