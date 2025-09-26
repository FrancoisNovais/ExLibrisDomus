import { Router } from "express";
import bookController from "../controllers/book.controller.js";

const router = Router();

/**
 * GET /api/books
 * @summary Récupérer tous les livres
 * @tags Book
 * @return {array<Book>} 200 - Liste de tous les livres
 */
router.get(
  "/",
  bookController.getAll.bind(bookController)
);
export default router;