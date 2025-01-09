const express = require("express");
const route = express.Router();
const validator = require("./validator");
const isAuthor = require("../../utilities/user-role-authorization").isAuthor;
const jwt_auth_verify = require("../../utilities/jwt-auth").verifyToken;
const controller = require("./controller");

route.post(
  "/",
  jwt_auth_verify,
  isAuthor,
  validator.validateCreateBook,
  controller.createBook
);
route.get("/", controller.getAllBooks);
route.get("/:id", validator.validateGetBookById, controller.getBookById);
route.put(
  "/:id",
  jwt_auth_verify,
  isAuthor,
  validator.validateUpdateBook,
  controller.updateBook
);
route.delete(
  "/:id",
  jwt_auth_verify,
  isAuthor,
  validator.validateDeleteBook,
  controller.deleteBook
);

module.exports = route;
