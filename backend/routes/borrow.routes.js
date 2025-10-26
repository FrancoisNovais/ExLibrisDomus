import { Router } from "express";
import borrowController from "../controllers/borrow.controller.js";
import validateSchema from "../middlewares/validate.js";
import { paramsSchema } from "../validation/global.schemas.js";

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

export default router;
 