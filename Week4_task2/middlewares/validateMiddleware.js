const validate = (schema, reqType) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[reqType]);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return res.status(400).json(errorMessage.join(", "));
    }
    req[reqType] = { ...value };
    next();
  };
};

module.exports = validate;
