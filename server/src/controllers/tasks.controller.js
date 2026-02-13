const Task = require("../models/Task");
const ApiError = require("../utils/ApiError");

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user.id });
    return res.status(201).json({ ok: true, message: "Task created", data: task });
  } catch (e) {
    return next(e);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json({ ok: true, data: tasks });
  } catch (e) {
    return next(e);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return next(new ApiError(404, "Task not found"));
    return res.json({ ok: true, data: task });
  } catch (e) {
    return next(e);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return next(new ApiError(404, "Task not found"));
    return res.json({ ok: true, message: "Task updated", data: task });
  } catch (e) {
    return next(e);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      const deleted = await Task.findByIdAndDelete(req.params.id);
      if (!deleted) return next(new ApiError(404, "Task not found"));
      return res.json({ ok: true, message: "Task deleted (admin)" });
    }

    const deleted = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return next(new ApiError(404, "Task not found"));
    return res.json({ ok: true, message: "Task deleted" });
  } catch (e) {
    return next(e);
  }
};
