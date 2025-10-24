import { Genre } from "../models/index.js";
import BaseController from "./base.controller.js";


class GenreController extends BaseController {
  constructor() {
    super(Genre, "genre");
  }
}

export default new GenreController();