import { Note } from "../models/index.js";
import BaseController from "./base.controller.js";


class NoteController extends BaseController {
  constructor() {
    super(Note, "Note");
  }
}

export default new NoteController();