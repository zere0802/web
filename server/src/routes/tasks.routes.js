const router = require("express").Router();
const Joi = require("joi");
const validate = require("../middleware/validate.middleware");
const auth = require("../middleware/auth.middleware");
const tasksController = require("../controllers/tasks.controller");

const createSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow("").optional(),
  status: Joi.string().valid("todo", "doing", "done").optional(),
  dueDate: Joi.date().allow(null).optional(),
  categoryId: Joi.string().allow(null).optional()
});

const updateSchema = Joi.object({
  title: Joi.string().min(2).max(100).optional(),
  description: Joi.string().allow("").optional(),
  status: Joi.string().valid("todo", "doing", "done").optional(),
  dueDate: Joi.date().allow(null).optional(),
  categoryId: Joi.string().allow(null).optional()
}).min(1);

router.post("/", auth, validate(createSchema), tasksController.createTask);
router.get("/", auth, tasksController.getTasks);
router.get("/:id", auth, tasksController.getTaskById);
router.put("/:id", auth, validate(updateSchema), tasksController.updateTask);
router.delete("/:id", auth, tasksController.deleteTask);

module.exports = router;
