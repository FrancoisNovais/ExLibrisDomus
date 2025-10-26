import { Router } from 'express';
import bookRouter from './book.routes.js';
import authorRouter from "./author.routes.js";
import shelfRouter from "./shelf.routes.js";
import genreRouter from "./genre.routes.js";
import borrowerRouter from './borrower.routes.js';
import noteRouter from './note.routes.js';
import borrowRouter from './borrow.routes.js';
import errorHandler from "../middlewares/errorHandler.js";
import Handler404 from "../middlewares/error404.js";

const router = Router();

router.use('/authors', authorRouter)
router.use('/books', bookRouter)
router.use('/shelves', shelfRouter)
router.use('/genres', genreRouter)
router.use('/borrowers', borrowerRouter)
router.use('/notes', noteRouter)
router.use('/borrows', borrowRouter)

router.use(Handler404);
router.use(errorHandler);

export default router