import { Router } from "express";
import borrowerController from "../controllers/borrower.controller.js";

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

export default router;
