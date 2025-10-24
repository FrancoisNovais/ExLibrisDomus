import { Shelf} from "../models/index.js";
import BaseController from "./base.controller.js";


class ShelfController extends BaseController {
  constructor() {
    super(Shelf, "étagère");
  }
}

export default new ShelfController();