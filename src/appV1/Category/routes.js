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

router.post("/categories", isAuthor, jwt_auth_verify, validateCreateCategory);
router.get("/categories");
router.get("/categories/:id", validateGetCategoryById);
router.put(
  "/categories/:id",
  isAuthor,
  jwt_auth_verify,
  validateUpdateCategory
);
router.delete(
  "/categories/:id",
  isAuthor,
  jwt_auth_verify,
  validateDeleteCategory
);

module.exports = router;
