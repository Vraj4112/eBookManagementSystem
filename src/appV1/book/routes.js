// routes/bookRoutes.js
const express = require("express");
const router = express.Router();
const {
  validateCreateBook,
  validateUpdateBook,
  validateDeleteBook,
  validateGetBookById,
} = require("./validator");
const { isAuthor } = require("../../utilities/user-role-authorization");
const jwt_auth_verify = require("../../utilities/jwt-auth").verifyToken;
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("./controller");

router.post(
  "/books",
  isAuthor,
  jwt_auth_verify,
  validateCreateBook,
  createBook
);
router.get("/books", getAllBooks);
router.get("/books/:id", validateGetBookById, getBookById);
router.put(
  "/books/:id",
  isAuthor,
  jwt_auth_verify,
  validateUpdateBook,
  updateBook
);
router.delete(
  "/books/:id",
  isAuthor,
  jwt_auth_verify,
  validateDeleteBook,
  deleteBook
);

module.exports = router;
