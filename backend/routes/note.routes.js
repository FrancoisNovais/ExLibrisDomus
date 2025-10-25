import { Router } from "express";
import noteController from "../controllers/note.controller.js";

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

export default router;
 