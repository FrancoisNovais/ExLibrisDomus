import { Router } from "express";
import noteController from "../controllers/note.controller.js";
import validateSchema from "../middlewares/validate.js";
import { paramsSchema } from "../validation/global.schemas.js";
import { createNoteSchema, updateNoteSchema } from "../validation/note.schemas.js";

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

/**
 * POST /api/notes
 * @summary Créer une nouvelle note
 * @tags Note
 * @param {Note} request.body.required - Données de la note
 * @return {Note} 201 - Note créée
 * @return {object} 400 - Erreur de validation
 */
router.post(
  "/",
  validateSchema(createNoteSchema, "body"),
  noteController.create.bind(noteController)
);

/**
 * PATCH /api/notes/{itemId}
 * @summary Mettre à jour une note existante
 * @tags Note
 * @param {string} itemId.path.required - ID de la note
 * @param {Note} request.body.required - Champs à mettre à jour
 * @return {Note} 200 - Note mise à jour
 * @return {object} 400 - Erreur de validation
 * @return {object} 404 - Note non trouvée
 */
router.patch(
  "/:itemId",
  validateSchema(updateNoteSchema, "body"),
  validateSchema(paramsSchema, "params"),
  noteController.updateById.bind(noteController)
);

/**
 * DELETE /api/notes/{itemId}
 * @summary Supprimer une note
 * @tags Note
 * @param {string} itemId.path.required - ID de la note
 * @return {object} 204 - Note supprimée avec succès
 * @return {object} 404 - Note non trouvée
 */
router.delete(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  noteController.deleteById.bind(noteController)
);

export default router;
 