const Category = require("../models/Category");

exports.create = async (req, res, next) => {
  try {
    const { name, color } = req.body;
    const category = await Category.create({
      userId: req.user.id,
      name,
      color: color || "#60a5fa",
    });
    res.status(201).json({ ok: true, message: "Category created", data: category });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ ok: false, message: "Category already exists" });
    }
    next(e);
  }
};

exports.list = async (req, res, next) => {
  try {
    const categories = await Category.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ ok: true, data: categories });
  } catch (e) {
    next(e);
  }
};
