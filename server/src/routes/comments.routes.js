const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const c = require("../controllers/comments.controller");

router.post("/tasks/:id/comments", auth, c.add);
router.get("/tasks/:id/comments", auth, c.list);

module.exports = router;
