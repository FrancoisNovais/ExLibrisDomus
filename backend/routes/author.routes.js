import { Router } from "express";
import authorController from "../controllers/author.controller.js";

const router = Router();

/**
 * GET /api/authors
 * @summary Récupérer tous les auteurs
 * @tags Author
 * @return {array<Author>} 200 - Liste de tous les auteurs
 */
router.get(
    "/",
    authorController.getAll.bind(authorController)
);

export default router;