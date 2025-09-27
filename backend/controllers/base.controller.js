import HTTPError from "../errors/httpError.js";
import { StatusCodes } from "http-status-codes";

export default class BaseController {
  constructor(model, modelName) {
    this.model = model;
    this.modelName = modelName;
  }

  static generateInclude(includeQuery) {
    return [];
  }

  getAll = async function (req, res) {
    const items = await this.model.findAll({
      include: BaseController.generateInclude(req.query.include),
    });
    res.json(items);
  };

  getById = async function (req, res) {
    let { itemId } = req.params;
    const item = await this.model.findByPk(itemId, {
      include: BaseController.generateInclude(req.query.include),
    });
    if (!item) {
      throw new HTTPError(
        StatusCodes.NOT_FOUND,
        `${this.modelName} non trouvé`
      );
    }
    res.json(item);
  };

  create = async function (req, res) {
    try {
      const newItem = await this.model.create(req.body);
      res.json(newItem);
    } catch (error) {
      throw new HTTPError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  deleteById = async function (req, res) {
    const { itemId } = req.params;
    const deletedCount = await this.model.destroy({ where: { id: itemId } });
    if (!deletedCount) {
      throw new HTTPError(
        StatusCodes.NOT_FOUND,
        `${this.modelName} non trouvé`
      );
    }
    return res.sendStatus(204);
  };

  updateById = async function (req, res) {
    const { itemId } = req.params;
    const [updatedCount, updatedItems] = await this.model.update(req.body, {
      where: {
        id: itemId,
      },
      returning: true,
    });
    if (!updatedCount) {
      throw new HTTPError(
        StatusCodes.NOT_FOUND,
        `${this.modelName} non trouvé`
      );
    }
    res.json(updatedItems[0]);
  };
}
