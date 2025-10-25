import { Router } from "express";
import noteController from "../controllers/note.controller.js";
import validateSchema from "../middlewares/validate.js";
import { paramsSchema } from "../validation/global.schemas.js";

const router = Router();

/**
 * GET /api/notes
 * @summary Récupérer tous les notes
 * @tags Note
 * @return {array<Note>} 200 - Liste de toutes les notes
 */
router.get(
  "/",
  noteController.getAll.bind(noteController)
);

/**
 * GET /api/notes/{itemId}
 * @summary Récupérer une note par son ID
 * @tags Note
 * @param {string} itemId.path.required - ID de la note
 * @return {Note} 200 - Note trouvée
 * @return {object} 404 - Note non trouvée
 */
router.get(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  noteController.getById.bind(noteController)
);


export default router;
 