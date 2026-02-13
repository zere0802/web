const User = require("../models/User");
const ApiError = require("../utils/ApiError");

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return next(new ApiError(404, "User not found"));
    return res.json({ ok: true, data: user });
  } catch (e) {
    return next(e);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    if (email) {
      const exists = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (exists) return next(new ApiError(400, "Email already used"));
    }

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { ...(username ? { username } : {}), ...(email ? { email } : {}) },
      { new: true }
    ).select("-passwordHash");

    return res.json({ ok: true, message: "Profile updated", data: updated });
  } catch (e) {
    return next(e);
  }
};
