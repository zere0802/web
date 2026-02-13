const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

function signToken(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return next(new ApiError(400, "Email already used"));

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      passwordHash,
      role: "user"
    });

    return res.status(201).json({
      ok: true,
      message: "Registered",
      data: { id: user._id, username: user.username, email: user.email }
    });
  } catch (e) {
    return next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new ApiError(401, "Invalid email or password"));

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return next(new ApiError(401, "Invalid email or password"));

    const token = signToken(user);

    return res.json({
      ok: true,
      message: "Logged in",
      data: { token }
    });
  } catch (e) {
    return next(e);
  }
};
