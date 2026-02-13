const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true, minlength: 2 },
    description: { type: String, default: "" },
    status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
    dueDate: { type: Date, default: null },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
