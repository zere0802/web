const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const c = require("../controllers/categories.controller");

router.post("/", auth, c.create);
router.get("/", auth, c.list);

module.exports = router;
