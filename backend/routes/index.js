import { Router } from 'express';
import bookRouter from './book.routes.js';
import authorRouter from "./author.routes.js";
import errorHandler from "../middlewares/errorHandler.js";
import Handler404 from "../middlewares/error404.js";

const router = Router();

router.use('/authors', authorRouter)
router.use('/books', bookRouter)

router.use(Handler404);
router.use(errorHandler);

export default router