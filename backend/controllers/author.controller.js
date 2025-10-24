import { Author } from "../models/index.js";
import BaseController from "./base.controller.js";


class AuthorController extends BaseController {
  constructor() {
    super(Author, "livre");
  }
}

export default new AuthorController();