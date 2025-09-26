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
}
