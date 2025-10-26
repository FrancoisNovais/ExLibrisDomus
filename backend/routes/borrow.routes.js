import { Router } from "express";
import borrowController from "../controllers/borrow.controller.js";
import validateSchema from "../middlewares/validate.js";
import { paramsSchema } from "../validation/global.schemas.js";
import { createBorrowSchema, updateBorrowSchema } from "../validation/borrow.schemas.js";
import validateBorrow from "../middlewares/validateBorrow.js";

const router = Router();

/**
 * GET /api/borrows
 * @summary Récupérer tous les emprunts
 * @tags Borrow
 * @return {array<Borrow>} 200 - Liste de tous les emprunts
 */
router.get(
  "/",
  borrowController.getAll.bind(borrowController)
);

/**
 * GET /api/borrows/:itemId
 * @summary Récupérer un emprunt par son ID
 * @tags Borrow
 * @param {string} itemId.path.required - ID de l'emprunt
 * @return {Borrow} 200 - Emprunt trouvé
 * @return {object} 404 - Emprunt non trouvé
 */
router.get(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  borrowController.getById.bind(borrowController)
);

/**
 * POST /api/borrows
 * @summary Créer un nouveau emprunt
 * @tags Borrow
 * @param {Borrow} request.body.required - Données de l'emprunt
 * @return {Borrow} 201 - Emprunt créé
 * @return {object} 400 - Erreur de validation
 */
router.post(
  "/",
  validateSchema(createBorrowSchema, "body"),
  validateBorrow,
  borrowController.create.bind(borrowController)
);

/**
 * PATCH /api/borrows/{itemId}
 * @summary Mettre à jour un emprunt existant
 * @tags Borrow
 * @param {string} itemId.path.required - ID de l'emprunt
 * @param {Borrow} request.body.required - Champs à mettre à jour
 * @return {Borrow} 200 - Emprunt mis à jour
 * @return {object} 400 - Erreur de validation
 * @return {object} 404 - Emprunt non trouvé
 */
router.patch(
  "/:itemId",
  validateSchema(updateBorrowSchema, "body"),
  validateSchema(paramsSchema, "params"),
  validateBorrow,
  borrowController.updateById.bind(borrowController)
);

/**
 * DELETE /api/borrows/{borrowId}
 * @summary Supprimer un emprunt
 * @tags Borrow
 * @param {string} itemId.path.required - ID de l'emprunt
 * @return {object} 204 - Emprunt supprimé avec succès
 * @return {object} 404 - Emprunt non trouvé
 */
router.delete(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  borrowController.deleteById.bind(borrowController)
);

export default router;
 