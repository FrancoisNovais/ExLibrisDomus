import { Router } from "express";
import genreController from "../controllers/genre.controller.js";

const router = Router();

/**
 * GET /api/genres
 * @summary Récupérer tous les genres
 * @tags Genre
 * @return {array<Genre>} 200 - Liste de tout les genres
 */
router.get(
    "/",
    genreController.getAll.bind(genreController)
);
export default router;