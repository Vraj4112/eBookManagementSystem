const express = require("express");
const router = express.Router();
const { isAuthor } = require("../../utilities/user-role-authorization");
const jwt_auth_verify = require("../../utilities/jwt-auth").verifyToken;
const {
  validateCreateCategory,
  validateUpdateCategory,
  validateDeleteCategory,
  validateGetCategoryById,
} = require("./validator");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./controller");

router.post(
  "/categories",
  isAuthor,
  jwt_auth_verify,
  validateCreateCategory,
  createCategory
);
router.get("/categories", getAllCategories);
router.get("/categories/:id", validateGetCategoryById, getCategoryById);
router.put(
  "/categories/:id",
  isAuthor,
  jwt_auth_verify,
  validateUpdateCategory,
  updateCategory
);
router.delete(
  "/categories/:id",
  isAuthor,
  jwt_auth_verify,
  validateDeleteCategory,
  deleteCategory
);

module.exports = router;
