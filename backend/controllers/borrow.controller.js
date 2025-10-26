import { Borrow } from "../models/index.js";
import BaseController from "./base.controller.js";


class BorrowController extends BaseController {
  constructor() {
    super(Borrow, "Emprunt");
  }
}

export default new BorrowController();