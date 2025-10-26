import { Router } from "express";
import borrowController from "../controllers/borrow.controller.js";

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

export default router;
 