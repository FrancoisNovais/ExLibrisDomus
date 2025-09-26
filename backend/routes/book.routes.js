import { Router } from "express";
import bookController from "../controllers/book.controller.js";

const router = Router();

router.get(
  "/",
  bookController.getAll.bind(bookController)
);

export default router;