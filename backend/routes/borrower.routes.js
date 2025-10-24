import { Router } from "express";
import borrowerController from "../controllers/borrower.controller.js";
import validateSchema from "../middlewares/validate.js";
import { paramsSchema } from "../validation/global.schemas.js";
import { createBorrowerSchema, updateBorrowerSchema } from "../validation/borrower.schemas.js";

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

/**
 * POST /api/borrowers
 * @summary Créer un nouveau emprunteur
 * @tags Borrower
 * @param {Borrower} request.body.required - Données de l'emprunteur
 * @return {Borrower} 201 - Emprunteur créé
 * @return {object} 400 - Erreur de validation
 */
router.post(
  "/",
  validateSchema(createBorrowerSchema, "body"),
  borrowerController.create.bind(borrowerController)
);

/**
 * PATCH /api/borrowers/{itemId}
 * @summary Mettre à jour un emprunteur existant
 * @tags Borrower
 * @param {string} itemId.path.required - ID de l'emprunteur
 * @param {Borrower} request.body.required - Champs à mettre à jour
 * @return {Borrower} 200 - Emprunteur mis à jour
 * @return {object} 400 - Erreur de validation
 * @return {object} 404 - Emprunteur non trouvé
 */
router.patch(
  "/:itemId",
  validateSchema(updateBorrowerSchema, "body"),
  validateSchema(paramsSchema, "params"),
  borrowerController.updateById.bind(borrowerController)
);


export default router;
 