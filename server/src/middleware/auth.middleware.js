const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return next(new ApiError(401, "No token provided"));
  }

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch {
    return next(new ApiError(401, "Invalid token"));
  }
}

module.exports = auth;
