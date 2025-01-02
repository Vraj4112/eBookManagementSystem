// routes/bookRoutes.js
const express = require("express");
const {
  createBook,
  updateBook,
  deleteBook,
  getBooks,
} = require("./controller");
const { validateBook } = require("./validator");
const { VerifyToken } = require("../../utilities/jwt-auth");

const router = express.Router();

router.post("/", VerifyToken, validateBook, createBook);
router.put("/:id", VerifyToken, validateBook, updateBook);
router.delete("/:id", VerifyToken, deleteBook);
router.get("/", VerifyToken, getBooks);

module.exports = router;
