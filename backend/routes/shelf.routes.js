import { Router } from "express";
import shelfController from "../controllers/shelf.controller.js";
import validateSchema from "../middlewares/validate.js";
import { paramsSchema } from "../validation/global.schemas.js";

const router = Router();

/**
 * GET /api/shelves
 * @summary Récupérer tous les étagères
 * @tags shelf
 * @return {array<Shelf>} 200 - Liste de toutes les étagères
 */
router.get(
    "/",
    shelfController.getAll.bind(shelfController)
);

/**
 * GET /api/shelves/{itemId}
 * @summary Récupérer une étagère par son ID
 * @tags Shelf
 * @param {string} itemId.path.required - ID de l'auteur
 * @return {Shelf} 200 - Auteur trouvé
 * @return {object} 404 - Auteur non trouvé
 */
router.get(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  shelfController.getById.bind(shelfController)
);

export default router;