// routes/commentRoutes.js
const express = require("express");
const { createComment, approveComment, getComments } = require("./controller");
const router = express.Router();

router.post("/", createComment);
router.put("/:id/approve", approveComment);
router.get("/:bookId", getComments);

module.exports = router;
