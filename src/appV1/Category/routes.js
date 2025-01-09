const express = require("express");
const router = express.Router();
const isAuthor = require("../../utilities/user-role-authorization").isAuthor;
const jwt_auth_verify = require("../../utilities/jwt-auth").verifyToken;
const validator = require("./validator");
const controller = require("./controller");

router.post(
  "/",
  jwt_auth_verify,
  isAuthor,
  validator.validateCreateCategory,
  controller.createCategory
);
router.get("/", controller.getAllCategories);
router.get(
  "/:id",
  validator.validateGetCategoryById,
  controller.getCategoryById
);
router.put(
  "/:id",
  jwt_auth_verify,
  isAuthor,
  validator.validateUpdateCategory,
  controller.updateCategory
);
router.delete(
  "/:id",
  jwt_auth_verify,
  isAuthor,
  validator.validateDeleteCategory,
  controller.deleteCategory
);

module.exports = router;
