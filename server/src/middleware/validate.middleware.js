const ApiError = require("../utils/ApiError");

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) return next(new ApiError(400, error.details[0].message));
    return next();
  };
}

module.exports = validate;
