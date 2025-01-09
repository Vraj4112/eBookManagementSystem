const express = require("express");
const router = express.Router();
const user_role = require("../../utilities/user-role-authorization");
const jwt_auth_verify = require("../../utilities/jwt-auth").verifyToken;
const validator = require("./validator");
const controller = require("./controller");

router.post(
  "/books/:bookId/comments",
  user_role.isReader,
  jwt_auth_verify,
  validator.validateCreateComment,
  controller.createComment
);
router.get(
  "/books/:bookId/comments",
  validator.validateGetCommentById,
  controller.getCommentsByBookId
);
router.put(
  "/comments/:id/approve",
  user_role.isAuthor,
  jwt_auth_verify,
  validator.validateUpdateCommentStatus,
  controller.updateCommentStatus
);
router.delete(
  "/comments/:id",
  user_role.isAuthor,
  jwt_auth_verify,
  validator.validateDeleteComment,
  controller.deleteComment
);

module.exports = router;
