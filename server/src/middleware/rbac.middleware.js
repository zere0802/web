const ApiError = require("../utils/ApiError");

function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden: insufficient role"));
    }
    return next();
  };
}

module.exports = allowRoles;
