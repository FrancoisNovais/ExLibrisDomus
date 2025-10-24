import { Router } from "express";
import borrowerController from "../controllers/borrower.controller.js";
import validateSchema from "../middlewares/validate.js";
import { paramsSchema } from "../validation/global.schemas.js";

const router = Router();

/**
 * GET /api/borrowers
 * @summary Récupérer tous les emprunteurs
 * @tags Borrower
 * @return {array<Borrower>} 200 - Liste de tous les emprunteurs
 */
router.get(
  "/",
  borrowerController.getAll.bind(borrowerController)
);

/**
 * GET /api/borrowers/{itemId}
 * @summary Récupérer un emprunteur par son ID
 * @tags Borrower
 * @param {string} itemId.path.required - ID du l'emprunteur
 * @return {Borrower} 200 - Emprunteur trouvé
 * @return {object} 404 - Emprunteur non trouvé
 */
router.get(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  borrowerController.getById.bind(borrowerController)
);

export default router;
 