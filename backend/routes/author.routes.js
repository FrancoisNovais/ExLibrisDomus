import { Router } from "express";
import authorController from "../controllers/author.controller.js";
import validateSchema from "../middlewares/validate.js";
import { paramsSchema } from "../validation/global.schemas.js";

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

/**
 * GET /api/authors/{itemId}
 * @summary Récupérer un auteur par son ID
 * @tags Author
 * @param {string} itemId.path.required - ID de l'auteur
 * @return {Author} 200 - Auteur trouvé
 * @return {object} 404 - Auteur non trouvé
 */
router.get(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  authorController.getById.bind(authorController)
);

export default router;