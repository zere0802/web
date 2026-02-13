const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    color: { type: String, default: "#60a5fa" },
  },
  { timestamps: true }
);

CategorySchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Category", CategorySchema);
