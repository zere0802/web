const ApiError = require("../utils/ApiError");

function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ ok: false, message: err.message });
  }
  console.error(err);
  return res.status(500).json({ ok: false, message: "Server error" });
}

module.exports = errorHandler;
