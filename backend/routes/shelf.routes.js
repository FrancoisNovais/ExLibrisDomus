import { Router } from "express";
import shelfController from "../controllers/shelf.controller.js";
import validateSchema from "../middlewares/validate.js";
import { paramsSchema } from "../validation/global.schemas.js";
import { createShelfSchema, updateShelfSchema } from "../validation/shelf.schemas.js";

const router = Router();

/**
 * GET /api/shelves
 * @summary Récupérer tous les étagères
 * @tags Shelf
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

/** * POST /api/shelves
 * @summary Créer une nouvelle étagère
 * @tags Shelf
 * @param {Shelf} request.body.required - Données de l'étagère
 * @return {Shelf} 201 - Etagère créé
 * @return {object} 400 - Erreur de validation
 */
router.post(
    "/",
    validateSchema(createShelfSchema, "body"),
    shelfController.create.bind(shelfController)
)

/**
 * PATCH /api/shelves/{itemId}
  * @summary Mettre à jour une étagère existante
  * @tags Shelf
  * @param {string} itemId.path.required - ID de l'étagère
  * @param {Shelf} request.body.required - Champs à mettre à jour
  * @return {Shelf} 200 - Etagère mis à jour
  * @return {object} 400 - Erreur de validation
  * @return {object} 404 - Etagère non trouvé
 */
router.patch(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  validateSchema(updateShelfSchema, "body"),
  shelfController.updateById.bind(shelfController)
);

/** DELETE /api/shelves/{itemId}
 * @summary Supprimer une étagère par son ID
 * @tags Shelf
 * @param {string} itemId.path.required - ID de l'étagère
 * @return {object} 204 - Etagère supprimé
 * @return {object} 404 - Etagère non trouvé
 */
router.delete(
    "/:itemId",
    validateSchema(paramsSchema, "params"),
    shelfController.deleteById.bind(shelfController)
);

export default router;