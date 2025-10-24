import { Router } from "express";
import shelfController from "../controllers/shelf.controller.js";

const router = Router();

/**
 * GET /api/shelves
 * @summary Récupérer tous les étagères
 * @tags shelf
 * @return {array<Shelf>} 200 - Liste de toutes les étagères
 */
router.get(
    "/",
    shelfController.getAll.bind(shelfController)
);

export default router;