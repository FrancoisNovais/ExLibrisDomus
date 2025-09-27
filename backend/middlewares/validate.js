export default function validateSchema(schema, targetProperty) {
  return function (req, res, next) {
    const { error } = schema.validate(req[targetProperty]);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
}