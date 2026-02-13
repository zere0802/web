const Comment = require("../models/Comment");
const Task = require("../models/Task");

exports.add = async (req, res, next) => {
  try {
    const { id } = req.params; // taskId
    const { text } = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ ok: false, message: "Task not found" });

    if (String(task.userId) !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ ok: false, message: "Forbidden" });
    }

    const comment = await Comment.create({ taskId: id, userId: req.user.id, text });
    res.status(201).json({ ok: true, message: "Comment added", data: comment });
  } catch (e) {
    next(e);
  }
};

exports.list = async (req, res, next) => {
  try {
    const { id } = req.params; // taskId
    const comments = await Comment.find({ taskId: id }).sort({ createdAt: -1 });
    res.json({ ok: true, data: comments });
  } catch (e) {
    next(e);
  }
};
