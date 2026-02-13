const router = require("express").Router();
const Joi = require("joi");
const validate = require("../middleware/validate.middleware");
const auth = require("../middleware/auth.middleware");
const usersController = require("../controllers/users.controller");

const updateSchema = Joi.object({
  username: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional()
}).min(1);

router.get("/profile", auth, usersController.getProfile);
router.put("/profile", auth, validate(updateSchema), usersController.updateProfile);

module.exports = router;
