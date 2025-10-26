import { Router } from "express";
import borrowController from "../controllers/borrow.controller.js";
import validateSchema from "../middlewares/validate.js";
import { paramsSchema } from "../validation/global.schemas.js";
import { createBorrowSchema } from "../validation/borrow.schemas.js";

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
  borrowController.create.bind(borrowController)
);

export default router;
 