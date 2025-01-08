const express = require("express");
const router = express.Router();

const {
  isAuthor,
  isReader,
} = require("../../utilities/user-role-authorization");
const jwt_auth_verify = require("../../utilities/jwt-auth").verifyToken;
const {
  validateCreateComment,
  validateUpdateCommentStatus,
  validateDeleteComment,
  validateGetCommentById,
} = require("./validator");
const {
  createComment,
  getCommentsByBookId,
  updateCommentStatus,
  deleteComment,
} = require("./controller");

router.post(
  "/books/:bookId/comments",
  isReader,
  jwt_auth_verify,
  validateCreateComment,
  createComment
);
router.get(
  "/books/:bookId/comments",
  validateGetCommentById,
  getCommentsByBookId
);
router.put(
  "/comments/:id/approve",
  isAuthor,
  jwt_auth_verify,
  validateUpdateCommentStatus,
  updateCommentStatus
);
router.delete(
  "/comments/:id",
  isAuthor,
  jwt_auth_verify,
  validateDeleteComment,
  deleteComment
);

module.exports = router;
