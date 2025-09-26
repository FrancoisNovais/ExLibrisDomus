import { Book } from "../models/index.js";
import BaseController from "./base.controller.js";


class BookController extends BaseController {
  constructor() {
    super(Book, "livre");
  }
}

export default new BookController();