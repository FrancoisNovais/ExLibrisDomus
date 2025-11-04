import { Router } from "express";
import bookController from "../controllers/book.controller.js";
import { paramsSchema } from "../validation/global.schemas.js";
import validateSchema from "../middlewares/validate.js";
import { 
  createBookSchema, 
  createBookAdvancedSchema, 
  updateBookSchema 
} from "../validation/book.schemas.js";

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

/**
 * POST /api/books/advanced
 * @summary Créer un nouveau livre (avancé - avec création auteur/genre)
 * @tags Book
 * @param {BookAdvanced} request.body.required - Données du livre avec auteur/genre inline
 * @return {Book} 201 - Livre créé avec toutes les relations
 * @return {object} 400 - Erreur de validation
 * @example request - Exemple avec nouvel auteur et nouveau genre
 * {
 *   "title": "The Fellowship of the Ring",
 *   "year": 1954,
 *   "pages": 423,
 *   "author": {
 *     "first_name": "J.R.R.",
 *     "last_name": "Tolkien"
 *   },
 *   "genre": "Fantasy",
 *   "cover": "https://covers.openlibrary.org/b/isbn/9780261103573-L.jpg"
 * }
 * @example request - Exemple avec IDs existants
 * {
 *   "title": "1984",
 *   "year": 1949,
 *   "id_author": 5,
 *   "id_genre": 2,
 *   "id_shelf": 1
 * }
 */
router.post(
  "/advanced",
  validateSchema(createBookAdvancedSchema, "body"),
  bookController.createAdvanced.bind(bookController)
);

/**
 * GET /api/books/lookup/{isbn}
 * @summary Récupérer les infos d'un livre via son ISBN depuis une API externe
 * @tags Book
 * @param {string} isbn.path.required - ISBN du livre
 * @return {Book} 200 - Données du livre récupérées
 * @return {object} 404 - Livre non trouvé
 */
router.get(
  "/lookup/:isbn",
  bookController.lookupByIsbn.bind(bookController)
);

/**
 * GET /api/books/{itemId}
 * @summary Récupérer un livre par son ID
 * @tags Book
 * @param {string} itemId.path.required - ID du livre
 * @return {Book} 200 - Livre trouvé
 * @return {object} 404 - Livre non trouvé
 */
router.get(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  bookController.getById.bind(bookController)
);

/**
 * POST /api/books
 * @summary Créer un nouveau livre
 * @tags Book
 * @param {Book} request.body.required - Données du livre
 * @return {Book} 201 - Livre créé
 * @return {object} 400 - Erreur de validation
 */
router.post(
  "/",
  validateSchema(createBookSchema, "body"),
  bookController.create.bind(bookController)
);

/**
 * PATCH /api/books/{itemId}
 * @summary Mettre à jour un livre existant
 * @tags Book
 * @param {string} itemId.path.required - ID du livre
 * @param {Book} request.body.required - Champs à mettre à jour
 * @return {Book} 200 - Livre mis à jour
 * @return {object} 400 - Erreur de validation
 * @return {object} 404 - Livre non trouvé
 */
router.patch(
  "/:itemId",
  validateSchema(updateBookSchema, "body"),
  validateSchema(paramsSchema, "params"),
  bookController.updateById.bind(bookController)
);

/**
 * DELETE /api/books/{itemId}
 * @summary Supprimer un livre
 * @tags Book
 * @param {string} itemId.path.required - ID du livre
 * @return {object} 204 - Livre supprimé avec succès
 * @return {object} 404 - Livre non trouvé
 */
router.delete(
  "/:itemId",
  validateSchema(paramsSchema, "params"),
  bookController.deleteById.bind(bookController)
);

export default router;
