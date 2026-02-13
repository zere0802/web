const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/error.middleware");

const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const tasksRoutes = require("./routes/tasks.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, message: "API is running" }));

app.use("/api", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/categories", require("./routes/categories.routes"));
app.use("/api", require("./routes/comments.routes"));

app.use(errorHandler);

module.exports = app;
