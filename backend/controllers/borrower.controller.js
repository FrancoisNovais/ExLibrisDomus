import { Borrower } from "../models/index.js";
import BaseController from "./base.controller.js";


class BorrowerController extends BaseController {
  constructor() {
    super(Borrower, "Emprunteur");
  }
}

export default new BorrowerController();